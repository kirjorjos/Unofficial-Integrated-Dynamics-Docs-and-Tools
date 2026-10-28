import {
  getSourceCards,
  isSourceNode,
  withSourceCards,
} from "lib/transformers/sourceNodes";

const assertNever = (node: never): never => {
  throw new Error(
    `Unhandled AST node type: ${(node as { type?: string }).type ?? String(node)}`
  );
};

export const astChildren = (node: TypeAST.AST): TypeAST.AST[] => {
  switch (node.type) {
    case "Curry":
      return [node.base, ...node.args];
    case "Pipe":
      return [node.op1, node.op2];
    case "Pipe2":
      return [node.op1, node.op2, node.op3];
    case "Flip":
      return [node.arg];
    case "List":
      return [...node.value];
    case "Reader":
      return node.value.simulatedOutput ? [node.value.simulatedOutput] : [];
    case "Materialize":
    case "Dynamic":
    case "Static":
    case "Display":
    case "Card":
      return [node.value];
    case "NetworkCards":
      return node.definitions.map((definition) => definition.node);
    case "Lambda":
      return [node.body];
    case "Operator":
    case "Variable":
    case "Param":
    case "Integer":
    case "Long":
    case "Double":
    case "String":
    case "Boolean":
    case "Null":
    case "NBT":
    case "Block":
    case "Item":
    case "Fluid":
    case "Entity":
    case "Ingredients":
    case "Recipe":
      return [];
    case "VarStore":
    case "DisplayPanel":
    case "Writer":
    case "Exporter":
    case "Importer":
      return getSourceCards(node);
    default:
      return assertNever(node);
  }
};

export const visitAst = (
  node: TypeAST.AST,
  visit: (node: TypeAST.AST) => void,
  seen: Set<TypeAST.AST> = new Set()
): void => {
  if (seen.has(node)) return;
  seen.add(node);
  visit(node);
  for (const child of astChildren(node)) {
    visitAst(child, visit, seen);
  }
};

export const mapAst = (
  node: TypeAST.AST,
  map: (child: TypeAST.AST) => TypeAST.AST
): TypeAST.AST => {
  switch (node.type) {
    case "Curry":
      return {
        ...node,
        base: map(node.base) as TypeAST.Operator,
        args: node.args.map(map),
      };
    case "Pipe":
      return {
        ...node,
        op1: map(node.op1) as TypeAST.Operator,
        op2: map(node.op2) as TypeAST.Operator,
      };
    case "Pipe2":
      return {
        ...node,
        op1: map(node.op1) as TypeAST.Operator,
        op2: map(node.op2) as TypeAST.Operator,
        op3: map(node.op3) as TypeAST.Operator,
      };
    case "Flip":
      return { ...node, arg: map(node.arg) as TypeAST.Operator };
    case "List":
      return { ...node, value: node.value.map(map) };
    case "Reader":
      return node.value.simulatedOutput
        ? {
            ...node,
            value: {
              ...node.value,
              simulatedOutput: map(node.value.simulatedOutput),
            },
          }
        : node;
    case "Materialize":
    case "Dynamic":
    case "Static":
    case "Display":
    case "Card":
      return { ...node, value: map(node.value) };
    case "NetworkCards":
      return {
        ...node,
        definitions: node.definitions.map((definition) => ({
          ...definition,
          node: map(definition.node),
        })),
      };
    case "Lambda":
      return { ...node, body: map(node.body) };
    case "VarStore":
    case "DisplayPanel":
    case "Writer":
    case "Exporter":
    case "Importer":
      return withSourceCards(node, getSourceCards(node).map(map));
    case "Operator":
    case "Variable":
    case "Param":
    case "Integer":
    case "Long":
    case "Double":
    case "String":
    case "Boolean":
    case "Null":
    case "NBT":
    case "Block":
    case "Item":
    case "Fluid":
    case "Entity":
    case "Ingredients":
    case "Recipe":
      return node;
    default:
      return assertNever(node);
  }
};

export { isSourceNode };
