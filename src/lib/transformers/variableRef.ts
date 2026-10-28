export const variableFromAt = (raw: string): TypeAST.Variable => {
  const rest = raw.slice(1);
  return /^\d+$/.test(rest)
    ? { type: "Variable", id: rest }
    : { type: "Variable", label: rest };
};

export const variableFromLabel = (label: string): TypeAST.Variable => ({
  type: "Variable",
  label,
});

export const variableFromName = (name: string): TypeAST.Variable =>
  /^\d+$/.test(name) ? variableFromId(name) : variableFromLabel(name);

export const variableFromId = (id: string): TypeAST.Variable => ({
  type: "Variable",
  id,
});

export const variableRefText = (node: TypeAST.Variable): string | undefined =>
  node.label ?? node.id;

export const assertVariableShape = (node: TypeAST.Variable): void => {
  if (node.id === undefined && node.label === undefined) {
    throw new Error("A Variable node requires an id or a label");
  }
  if (node.id !== undefined && !/^\d+$/.test(node.id)) {
    throw new Error(`Invalid variable id "${node.id}": expected a decimal id`);
  }
};
