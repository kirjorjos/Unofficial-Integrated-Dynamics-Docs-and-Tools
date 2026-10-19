export const isSourceNode = (node: TypeAST.AST): node is TypeAST.Source =>
  node.type === "VarStore" ||
  node.type === "DisplayPanel" ||
  node.type === "Writer" ||
  node.type === "Exporter" ||
  node.type === "Importer";

export const getSourceCards = (node: TypeAST.Source): TypeAST.AST[] =>
  node.type === "VarStore" ? node.value.cards : node.value.inventory;

export const withSourceCards = (
  node: TypeAST.Source,
  cards: TypeAST.AST[]
): TypeAST.Source => {
  switch (node.type) {
    case "VarStore":
      return { ...node, value: { ...node.value, cards } };
    case "DisplayPanel":
      return { ...node, value: { ...node.value, inventory: cards } };
    case "Writer":
      return { ...node, value: { ...node.value, inventory: cards } };
    case "Exporter":
      return { ...node, value: { ...node.value, inventory: cards } };
    case "Importer":
      return { ...node, value: { ...node.value, inventory: cards } };
  }
};

export const sourceToNetworkCards = (
  node: TypeAST.Source
): TypeAST.NetworkCards => ({
  type: "NetworkCards",
  definitions: getSourceCards(node).map((card, index) => ({
    name: card.varName ?? String(index),
    node: card,
  })),
});
