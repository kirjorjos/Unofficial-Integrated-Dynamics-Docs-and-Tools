import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { flattenAnonymousBaseOperatorApplication } from "lib/transformers/helpers";

export const isVarRefNode = (
  node: TypeAST.AST
): node is TypeAST.Variable & { name: `@${string}` } =>
  node.type === "Variable" && node.name.startsWith("@");

const astContentKey = (ast: TypeAST.AST): string => {
  switch (ast.type) {
    case "Operator":
      return `Operator:${ast.opName}`;
    case "Curry":
      return `Curry:${astContentKey(ast.base)}(${ast.args
        .map(astContentKey)
        .join(",")})`;
    case "Pipe":
      return `Pipe(${astContentKey(ast.op1)},${astContentKey(ast.op2)})`;
    case "Pipe2":
      return `Pipe2(${astContentKey(ast.op1)},${astContentKey(ast.op2)},${astContentKey(ast.op3)})`;
    case "Flip":
      return `Flip(${astContentKey(ast.arg)})`;
    case "List":
      return `List[${ast.value.map(astContentKey).join(",")}]`;
    case "Variable":
      return `Variable:${ast.name}`;
    case "String":
      return `String:${ast.value}`;
    case "Boolean":
      return `Boolean:${ast.value}`;
    case "Integer":
    case "Long":
    case "Double":
      return `${ast.type}:${ast.value}`;
    case "Null":
      return "Null";
    case "NBT":
      return `NBT:${JSON.stringify(ast.value)}`;
    case "Block":
    case "Item":
    case "Fluid":
    case "Entity":
    case "Ingredients":
    case "Recipe":
      return `${ast.type}:${JSON.stringify(ast.value)}`;
    case "Reader":
      return `Reader:${ast.value.reader}:${ast.value.aspect}:${ast.value.partId ?? ""}:${
        ast.value.settings ? JSON.stringify(ast.value.settings) : ""
      }:${ast.value.simulatedOutput ? astContentKey(ast.value.simulatedOutput) : ""}`;
    case "NetworkCards":
      return `NetworkCards[${ast.definitions
        .map((d) => `${d.name}:${astContentKey(d.node)}`)
        .join(",")}]`;
    default:
      return (ast as TypeAST.AST).type;
  }
};

const getCurryChunks = (ast: TypeAST.Curried): { args: TypeAST.AST[] }[] => {
  const flattened = flattenAnonymousBaseOperatorApplication(ast);
  if (flattened?.fullyApplied) return [];

  const chunks: { args: TypeAST.AST[] }[] = [];
  const isApplyN =
    ast.base.type === "Operator" &&
    operatorRegistry[ast.base.opName]?.internalName ===
      "integrateddynamics:operator_apply_n";

  let currentBase: TypeAST.Operator = ast.base;
  let index = 0;

  while (index < ast.args.length) {
    let take = 1;
    if (isApplyN && index === 0 && ast.args.length >= 2) {
      take = 2;
    }

    const chunkArgs = ast.args.slice(index, index + take);
    chunks.push({ args: chunkArgs });

    currentBase = {
      type: "Curry",
      base: currentBase,
      args: chunkArgs,
    } as TypeAST.Curried;
    index += take;
  }

  return chunks;
};

export const countCards = (
  ast: TypeAST.AST,
  seen: Set<TypeAST.AST>,
  contentSeen: Set<string>
): number => {
  if (seen.has(ast)) return 0;

  const contentKey = astContentKey(ast);
  if (contentSeen.has(contentKey)) return 0;

  seen.add(ast);
  contentSeen.add(contentKey);

  switch (ast.type) {
    case "Operator":
      return 1;
    case "Curry": {
      const flattened = flattenAnonymousBaseOperatorApplication(ast);
      if (flattened?.fullyApplied && flattened.operator.type === "Operator") {
        let count = 1;
        for (const arg of flattened.args) {
          count += countCards(arg, seen, contentSeen);
        }
        return count;
      }
      let count = countCards(ast.base, seen, contentSeen);
      for (const chunk of getCurryChunks(ast)) {
        for (const arg of chunk.args) {
          count += countCards(arg, seen, contentSeen);
        }
        count += 1;
      }
      return count;
    }
    case "Pipe":
      return (
        1 +
        countCards(ast.op1, seen, contentSeen) +
        countCards(ast.op2, seen, contentSeen)
      );
    case "Pipe2":
      return (
        1 +
        countCards(ast.op1, seen, contentSeen) +
        countCards(ast.op2, seen, contentSeen) +
        countCards(ast.op3, seen, contentSeen)
      );
    case "Flip":
      return 1 + countCards(ast.arg, seen, contentSeen);
    case "List": {
      let count = 1;
      for (const entry of ast.value) {
        count += countCards(entry, seen, contentSeen);
      }
      return count;
    }
    default:
      return 1;
  }
};

const resolveVarRefs = (
  node: TypeAST.AST,
  resolve: (refName: string) => string
): void => {
  if (isVarRefNode(node)) {
    const id = resolve(node.name);
    (node as unknown as { type: string; value?: string; name?: string }).type =
      "Integer";
    (node as unknown as { value?: string }).value = id;
    delete (node as unknown as { name?: string }).name;
    return;
  }

  switch (node.type) {
    case "Curry":
      resolveVarRefs(node.base, resolve);
      for (const arg of node.args) resolveVarRefs(arg, resolve);
      break;
    case "Pipe":
      resolveVarRefs(node.op1, resolve);
      resolveVarRefs(node.op2, resolve);
      break;
    case "Pipe2":
      resolveVarRefs(node.op1, resolve);
      resolveVarRefs(node.op2, resolve);
      resolveVarRefs(node.op3, resolve);
      break;
    case "Flip":
      resolveVarRefs(node.arg, resolve);
      break;
    case "List":
      for (const entry of node.value) resolveVarRefs(entry, resolve);
      break;
    case "Reader":
      if (node.value.simulatedOutput) {
        resolveVarRefs(node.value.simulatedOutput, resolve);
      }
      break;
    default:
      break;
  }
};

export const buildNetworkCards = (
  nodes: TypeAST.AST[],
  startVariableId = 0,
  names?: string[]
): TypeAST.NetworkCards => {
  if (nodes.length === 0) {
    throw new Error("NetworkCards must contain at least one definition");
  }

  const nameToIndex = new Map<string, number>();
  if (names) {
    names.forEach((name, index) => nameToIndex.set(name, index));
  }

  const resolveRefIndex = (refName: string, currentIndex: number): number => {
    const positional = refName.match(/^@(\d+)$/);
    let index: number | undefined;
    if (positional) {
      index = parseInt(positional[1]!, 10);
    } else {
      index = nameToIndex.get(refName.slice(1));
    }
    if (index === undefined) {
      throw new Error(`Unknown card reference: ${refName}`);
    }
    if (index >= currentIndex) {
      throw new Error(
        `Card reference ${refName} points to a card that is not created yet (referenced from definition ${currentIndex})`
      );
    }
    return index;
  };

  const seen = new Set<TypeAST.AST>();
  const prefixSums: number[] = [];
  const definitions: { name: string; node: TypeAST.AST }[] = [];
  let cumulative = 0;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]!;
    resolveVarRefs(node, (refName) => {
      const index = resolveRefIndex(refName, i);
      const id = startVariableId + prefixSums[index]! - 1;
      return String(id);
    });
    const count = countCards(node, seen, new Set());
    cumulative += count;
    prefixSums[i] = cumulative;
    definitions.push({
      name: names ? names[i]! : (node.varName ?? ""),
      node,
    });
  }

  return { type: "NetworkCards", definitions };
};

export const assertNoVarRefs = (ast: TypeAST.AST): void => {
  resolveVarRefs(ast, () => {
    throw new Error(
      "@-references are only valid inside a multi-statement (network) input"
    );
  });
};

export const getNetworkDefLastCardIds = (
  ast: TypeAST.AST,
  startVariableId = 0
): Map<TypeAST.AST, number> => {
  const map = new Map<TypeAST.AST, number>();
  if (ast.type === "NetworkCards") {
    const seen = new Set<TypeAST.AST>();
    let cumulative = 0;
    for (const def of ast.definitions) {
      cumulative += countCards(def.node, seen, new Set());
      map.set(def.node, startVariableId + cumulative - 1);
    }
  }
  return map;
};
