import { astChildren, mapAst } from "lib/transformers/astTraversal";
import { evaluateStaticAst } from "lib/transformers/helpers";
import { getRefName } from "lib/transformers/NetworkCards";
import { StructuralParseError } from "lib/transformers/parseErrors";

export const DELAY_MIN_TICK_ERROR =
  "Unable to simulate ticks before the initial input";
export const DELAY_FREEZE_SHAPE_ERROR =
  "Delay(..., freezeAt) must be wrapped as Materialize(Static(Delay(...))) so the freeze point is fixed";

export const DEFAULT_DELAY_INTERVAL = 1;
export const DEFAULT_DELAY_CAPACITY = 5;

export type DelayEvaluator = (
  ast: TypeAST.AST,
  tick: number,
  context: DelaySimulationContext
) => TypeAST.AST | undefined;

interface SamplingSnapshot {
  history: TypeAST.AST[];
}

export interface DelaySimulationContext {
  sampling: Map<TypeAST.Delay, SamplingSnapshot>;
  definitions?: Map<string, TypeAST.AST>;
}

export const createDelaySimulationContext = (
  definitions?: Map<string, TypeAST.AST>
): DelaySimulationContext => ({ sampling: new Map(), definitions });

export interface DelaySimulation {
  node: TypeAST.Delay;
  interval: number;
  capacity: number;
  history: TypeAST.AST[];
  error?: string;
  errorTick?: number;
  frozen: boolean;
  tick: number;
}

export interface DocumentSimulation {
  targetTick: number;
  minimumTick: number;
  defaultTick: number;
  delays: DelaySimulation[];
  byNode: Map<TypeAST.Delay, DelaySimulation>;
}

export const delayInterval = (node: TypeAST.Delay): number =>
  node.interval ?? DEFAULT_DELAY_INTERVAL;

export const delayCapacity = (node: TypeAST.Delay): number =>
  node.capacity ?? DEFAULT_DELAY_CAPACITY;

const seededSamples = (node: TypeAST.Delay): TypeAST.AST[] => {
  const seeds = node.seeds ?? [];
  return seeds.length > delayCapacity(node)
    ? seeds.slice(seeds.length - delayCapacity(node))
    : seeds;
};

export const delayMinimumTick = (node: TypeAST.Delay): number =>
  seededSamples(node).length >= delayCapacity(node) ? 1 : 0;

export const delayDefaultTick = (node: TypeAST.Delay): number => {
  const seeds = seededSamples(node);
  if (seeds.length === 0) return 0;
  return Math.max(delayCapacity(node), seeds.length) * delayInterval(node);
};

export const delaySampleTick = (node: TypeAST.Delay, sample: number): number =>
  sample * delayInterval(node);

const walkDelayNodes = (
  ast: TypeAST.AST,
  visit: (node: TypeAST.Delay) => void,
  seen: Set<TypeAST.AST> = new Set()
): void => {
  if (seen.has(ast)) return;
  seen.add(ast);
  if (ast.type === "Delay") {
    visit(ast);
    walkDelayNodes(ast.value, visit, seen);
    return;
  }
  for (const child of astChildren(ast)) walkDelayNodes(child, visit, seen);
};

export const collectDelays = (ast: TypeAST.AST): TypeAST.Delay[] => {
  const found: TypeAST.Delay[] = [];
  walkDelayNodes(ast, (node) => found.push(node));
  return found;
};

type FreezeParent = "other" | "materialize" | "staticInMaterialize";

const validateFreezePlacement = (
  ast: TypeAST.AST,
  parent: FreezeParent,
  seen: Set<TypeAST.AST> = new Set()
): void => {
  if (seen.has(ast)) return;
  seen.add(ast);
  if (ast.type === "Delay") {
    if (ast.freezeAt !== undefined && parent !== "staticInMaterialize") {
      throw new StructuralParseError(DELAY_FREEZE_SHAPE_ERROR);
    }
    validateFreezePlacement(ast.value, "other", seen);
    return;
  }
  if (ast.type === "Materialize") {
    validateFreezePlacement(ast.value, "materialize", seen);
    return;
  }
  if (ast.type === "Static") {
    validateFreezePlacement(
      ast.value,
      parent === "materialize" ? "staticInMaterialize" : "other",
      seen
    );
    return;
  }
  for (const child of astChildren(ast)) {
    validateFreezePlacement(child, "other", seen);
  }
};

const validateTargetTick = (tick: number): void => {
  if (!Number.isInteger(tick) || tick < 0) {
    throw new StructuralParseError(
      "Target tick must be a whole number of at least 0"
    );
  }
  if (tick > Number.MAX_SAFE_INTEGER) {
    throw new StructuralParseError("Target tick is too large to simulate");
  }
};

const clearOnTypeChange = (
  history: TypeAST.AST[],
  sample: TypeAST.AST
): void => {
  if (history.length === 0) return;
  if (history[0]!.type !== sample.type) history.length = 0;
};

export const simulateDelay = (
  node: TypeAST.Delay,
  targetTick: number,
  evaluate: DelayEvaluator = evaluateAtTick,
  context: DelaySimulationContext = createDelaySimulationContext()
): DelaySimulation => {
  const interval = delayInterval(node);
  const capacity = delayCapacity(node);
  const seeds = seededSamples(node);
  const tick =
    node.freezeAt !== undefined
      ? Math.min(targetTick, node.freezeAt)
      : targetTick;
  const samples = Math.floor(tick / interval);

  const history: TypeAST.AST[] = [];
  let error: string | undefined;
  let errorTick: number | undefined;

  const snapshot: SamplingSnapshot = { history };
  context.sampling.set(node, snapshot);

  for (let sample = 1; sample <= samples; sample++) {
    const sampleTick = sample * interval;
    snapshot.history = history.slice();
    let value: TypeAST.AST | undefined;
    if (sample <= seeds.length) {
      value = seeds[sample - 1];
    } else {
      value = evaluate(node.value, sampleTick, context);
      if (value === undefined) {
        error = `Unable to evaluate the delay's input at tick ${sampleTick}`;
        errorTick = sampleTick;
        break;
      }
    }
    if (value === undefined) break;
    clearOnTypeChange(history, value);
    while (history.length >= capacity) history.shift();
    history.push(value);
  }

  context.sampling.delete(node);

  return {
    node,
    interval,
    capacity,
    history,
    ...(error !== undefined ? { error, errorTick } : {}),
    frozen: node.freezeAt !== undefined && targetTick >= node.freezeAt,
    tick,
  };
};

export const simulateDocument = (
  ast: TypeAST.AST,
  targetTick: number,
  evaluate: DelayEvaluator = evaluateAtTick
): DocumentSimulation => {
  validateTargetTick(targetTick);
  validateFreezePlacement(ast, "other");

  const nodes = collectDelays(ast);
  const minimumTick = nodes.reduce(
    (min, node) => Math.max(min, delayMinimumTick(node)),
    0
  );
  const defaultTick = nodes.reduce(
    (max, node) => Math.max(max, delayDefaultTick(node)),
    0
  );
  if (targetTick < minimumTick) {
    throw new StructuralParseError(DELAY_MIN_TICK_ERROR);
  }

  const definitions = new Map<string, TypeAST.AST>();
  if (ast.type === "NetworkCards") {
    for (const definition of ast.definitions) {
      if (definition.name !== "") {
        definitions.set(definition.name, definition.node);
        definitions.set(`@${definition.name}`, definition.node);
      }
      if (definition.node.varName !== undefined) {
        definitions.set(definition.node.varName, definition.node);
      }
      const segmentIndex = (definition as { segmentIndex?: number })
        .segmentIndex;
      if (segmentIndex !== undefined) {
        definitions.set(`#${segmentIndex}`, definition.node);
        definitions.set(`@${segmentIndex}`, definition.node);
      }
    }
    const finalSegment = ast.definitions
      .filter((definition) => definition.segmentIndex !== undefined)
      .at(-1);
    if (finalSegment !== undefined) {
      definitions.set("@calculation", finalSegment.node);
    }
  }
  const context = createDelaySimulationContext(definitions);
  const delays = nodes.map((node) =>
    simulateDelay(node, targetTick, evaluate, context)
  );
  const byNode = new Map<TypeAST.Delay, DelaySimulation>();
  for (const delay of delays) byNode.set(delay.node, delay);

  return { targetTick, minimumTick, defaultTick, delays, byNode };
};

export const delayHistoryList = (
  node: TypeAST.Delay,
  targetTick: number,
  context: DelaySimulationContext = createDelaySimulationContext()
): TypeAST.List => ({
  type: "List",
  value: simulateDelay(node, targetTick, evaluateAtTick, context).history,
});

export const materializeDelays = (
  node: TypeAST.AST,
  targetTick: number,
  cache: Map<TypeAST.AST, TypeAST.AST> = new Map(),
  context: DelaySimulationContext = createDelaySimulationContext(),
  resolving: ReadonlySet<string> = new Set()
): TypeAST.AST => {
  if (node.type === "Variable" && node.label !== undefined) {
    const target = context.definitions?.get(node.label);
    if (target !== undefined && !resolving.has(node.label)) {
      const next = new Set(resolving);
      next.add(node.label);
      return materializeDelays(target, targetTick, cache, context, next);
    }
    if (node.promise === true) return node;
  }
  if (node.type === "Integer") {
    const refName = getRefName(node);
    if (refName !== undefined) {
      const target = context.definitions?.get(refName);
      if (target !== undefined && !resolving.has(refName)) {
        const next = new Set(resolving);
        next.add(refName);
        return materializeDelays(target, targetTick, cache, context, next);
      }
    }
  }
  if (node.type === "Delay") {
    const sampling = context.sampling.get(node);
    if (sampling !== undefined) {
      return { type: "List", value: sampling.history };
    }
    const cached = cache.get(node);
    if (cached !== undefined) return cached;
    const list = delayHistoryList(node, targetTick, context);
    cache.set(node, list);
    return list;
  }
  return mapAst(node, (child) =>
    materializeDelays(child, targetTick, cache, context, resolving)
  );
};

export const evaluateAtTick = (
  node: TypeAST.AST,
  targetTick: number,
  context: DelaySimulationContext = createDelaySimulationContext()
): TypeAST.AST | undefined => {
  try {
    return evaluateStaticAst(
      materializeDelays(node, targetTick, undefined, context)
    );
  } catch {
    return undefined;
  }
};

export const documentDefaultTick = (ast: TypeAST.AST, fallback = 0): number => {
  const nodes = collectDelays(ast);
  if (nodes.length === 0) return fallback;
  return nodes.reduce((max, node) => Math.max(max, delayDefaultTick(node)), 0);
};

export const documentMinimumTick = (ast: TypeAST.AST): number =>
  collectDelays(ast).reduce(
    (min, node) => Math.max(min, delayMinimumTick(node)),
    0
  );
