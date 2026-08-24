const SIMPLE_ELEMENT_TYPES = new Set<string>([
  "Integer",
  "Long",
  "Double",
  "String",
  "Boolean",
  "Null",
  "NBT",
  "Block",
  "Item",
  "Fluid",
  "Entity",
  "Ingredients",
  "Recipe",
  "Operator",
  "Variable",
]);

export const isSimpleListElement = (ast: TypeAST.AST): boolean => {
  if (SIMPLE_ELEMENT_TYPES.has(ast.type)) return true;
  if (ast.type === "List") return ast.value.every(isSimpleListElement);
  return false;
};

export interface HoistedDef {
  name: string;
  node: TypeAST.AST;
}

export interface NormalizedSegment {
  hoisted: HoistedDef[];
  node: TypeAST.AST;
}

interface NormalizeCtx {
  usedNames: Set<string>;
  hoisted: HoistedDef[];
  hoistCounter: number;
}

const VAR_VALUE_BY_ID_READER: TypeAST.Reader = {
  type: "Reader",
  value: { reader: "NetworkReader", aspect: "OPERATOR_GETVARIABLEBYID" },
};

const opNode = (opName: TypeOperatorKey): TypeAST.BaseOperator => ({
  type: "Operator",
  opName,
});

const curry = (
  base: TypeAST.Operator,
  args: TypeAST.AST[]
): TypeAST.Curried => ({
  type: "Curry",
  base,
  args,
});

/** Registers a derived expression as its own card and returns an `@name` placeholder for it. */
const hoist = (node: TypeAST.AST, ctx: NormalizeCtx): TypeAST.Variable => {
  let name: string;
  do {
    name = `var${ctx.hoistCounter++}`;
  } while (ctx.usedNames.has(name));
  ctx.usedNames.add(name);
  ctx.hoisted.push({
    name,
    // never clobber an existing name (the node may be shared with a prior definition)
    node: node.varName ? node : { ...node, varName: name },
  });
  return { type: "Variable", name: `@${name}` };
};

type Chunk = { kind: "simple" | "derived"; values: TypeAST.AST[] };

const chunkList = (elements: TypeAST.AST[]): Chunk[] => {
  const chunks: Chunk[] = [];
  for (const element of elements) {
    const kind = isSimpleListElement(element) ? "simple" : "derived";
    const last = chunks[chunks.length - 1];
    if (last && last.kind === kind) {
      last.values.push(element);
    } else {
      chunks.push({ kind, values: [element] });
    }
  }
  return chunks;
};

const chunkToExpr = (chunk: Chunk, ctx: NormalizeCtx): TypeAST.AST => {
  if (chunk.kind === "simple") {
    return { type: "List", value: chunk.values };
  }
  if (chunk.values.length === 1) {
    return curry(opNode("LIST_APPEND"), [
      { type: "List", value: [] },
      chunk.values[0]!,
    ]);
  }
  const ids = chunk.values.map((element) => hoist(element, ctx));
  return curry(opNode("OPERATOR_MAP"), [
    VAR_VALUE_BY_ID_READER,
    { type: "List", value: ids },
  ]);
};

const foldConcat = (exprs: TypeAST.AST[]): TypeAST.AST => {
  let acc = exprs[0]!;
  for (let i = 1; i < exprs.length; i++) {
    acc = curry(opNode("LIST_CONCAT"), [acc, exprs[i]!]);
  }
  return acc;
};

const normalizeNode = (node: TypeAST.AST, ctx: NormalizeCtx): TypeAST.AST => {
  switch (node.type) {
    case "List": {
      const elements = node.value.map((element) => normalizeNode(element, ctx));
      if (elements.every(isSimpleListElement)) {
        return node;
      }
      const folded = foldConcat(
        chunkList(elements).map((chunk) => chunkToExpr(chunk, ctx))
      );
      return node.varName ? { ...folded, varName: node.varName } : folded;
    }
    case "Curry": {
      let changed = false;
      const base = normalizeNode(node.base, ctx);
      if (base !== node.base) changed = true;
      const args = node.args.map((arg) => {
        const next = normalizeNode(arg, ctx);
        if (next !== arg) changed = true;
        return next;
      });
      return changed ? { ...node, base: base as TypeAST.Operator, args } : node;
    }
    case "Pipe": {
      const op1 = normalizeNode(node.op1, ctx);
      const op2 = normalizeNode(node.op2, ctx);
      if (op1 === node.op1 && op2 === node.op2) return node;
      return {
        ...node,
        op1: op1 as TypeAST.Operator,
        op2: op2 as TypeAST.Operator,
      };
    }
    case "Pipe2": {
      const op1 = normalizeNode(node.op1, ctx);
      const op2 = normalizeNode(node.op2, ctx);
      const op3 = normalizeNode(node.op3, ctx);
      if (op1 === node.op1 && op2 === node.op2 && op3 === node.op3) return node;
      return {
        ...node,
        op1: op1 as TypeAST.Operator,
        op2: op2 as TypeAST.Operator,
        op3: op3 as TypeAST.Operator,
      };
    }
    case "Flip": {
      const arg = normalizeNode(node.arg, ctx);
      return arg === node.arg
        ? node
        : { ...node, arg: arg as TypeAST.Operator };
    }
    case "Reader": {
      if (!node.value.simulatedOutput) return node;
      const simulatedOutput = normalizeNode(node.value.simulatedOutput, ctx);
      if (simulatedOutput === node.value.simulatedOutput) return node;
      return {
        ...node,
        value: { ...node.value, simulatedOutput },
      };
    }
    case "NetworkCards": {
      let changed = false;
      const definitions = node.definitions.map((def) => {
        const next = normalizeNode(def.node, ctx);
        if (next !== def.node) changed = true;
        return { name: def.name, node: next };
      });
      return changed ? { ...node, definitions } : node;
    }
    default:
      return node;
  }
};

export const normalizeSegments = (
  segments: TypeAST.AST[],
  names?: (string | undefined)[]
): NormalizedSegment[] => {
  const ctx: NormalizeCtx = {
    usedNames: new Set<string>(),
    hoisted: [],
    hoistCounter: 0,
  };
  if (names) {
    for (const name of names) {
      if (name) ctx.usedNames.add(name);
    }
  }
  return segments.map((segment) => {
    const before = ctx.hoisted.length;
    const node = normalizeNode(segment, ctx);
    return { hoisted: ctx.hoisted.slice(before), node };
  });
};
