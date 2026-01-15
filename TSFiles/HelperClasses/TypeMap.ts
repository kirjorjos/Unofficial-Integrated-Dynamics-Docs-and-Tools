export class TypeMap {

  private static NUMBER_TYPES = ["Integer", "Long", "Double", "Number"]

  aliases: Map<number, number | TypeRawSignatureAST.RawSignatureDefiniteValue>;
  constructor() {
    this.aliases = new Map();
  }

  findBaseID(typeID: number) {
    while (this.aliases.has(typeID)) {
      let newValue = this.aliases.get(typeID);
      if (typeof newValue != "number") break;
      typeID = newValue;
    }
    return typeID;
  }

  unify(
    a: TypeRawSignatureAST.RawSignatureNode,
    b: TypeRawSignatureAST.RawSignatureNode
  ): void {
    if (a.type === "Any" && b.type === "Any") {
      this.aliases.set(this.findBaseID(a.typeID), this.findBaseID(b.typeID));
      return;
    }

    if (a.type === "Any" && b.type !== "Any") {
      this.aliases.set(this.findBaseID(a.typeID), b);
      return;
    }
    if (a.type !== "Any" && b.type === "Any") {
      this.aliases.set(this.findBaseID(b.typeID), a);
      return;
    }

    if (a.type === "List" && b.type === "List") {
      this.unify(a.listType, b.listType);
    }

    if (a.type === "Function" && b.type === "Function") {
      this.unify(a.from, b.from);
      this.unify(a.to, b.to);
      return;
    }

    if (a.type === "Operator" && b.type === "Operator") {
      this.unify(a.obscured, b.obscured);
      return;
    }

    if (TypeMap.NUMBER_TYPES.includes(a.type) && TypeMap.NUMBER_TYPES.includes(b.type)) return;

    if (a.type !== b.type) {
      throw new Error(`Type mismatch: ${a.type} vs ${b.type}`);
    }

    return;
  }

  rewrite(
    node: TypeRawSignatureAST.RawSignatureNode
  ): TypeRawSignatureAST.RawSignatureNode {
    if (node.type === "Any") {
      return { type: "Any", typeID: this.findBaseID(node.typeID) };
    }

    if (node.type === "Function") {
      return {
        type: "Function",
        from: this.rewrite(node.from),
        to: this.rewrite(node.to),
      };
    }

    if (node.type === "Operator") {
      return {
        type: "Operator",
        obscured: this.rewrite(
          node.obscured
        ) as TypeRawSignatureAST.RawSignatureFunction,
      };
    }

    if (node.type === "List") {
      return {
        type: "List",
        listType: this.rewrite(node.listType),
      };
    }

    return node;
  }

  resolve(node: TypeRawSignatureAST.RawSignatureNode): typeof node {
    if (node.type === "Any") {
      let alias = this.aliases.get(node.typeID);
      if (alias) {
        if (typeof alias === "number") {
          alias = this.findBaseID(alias);
          alias = this.aliases.get(alias);
          if (typeof alias === "number") return node; // We don't know the type of this any yet
        }
        return this.resolve(alias!);
      }
      return node;
    }

    if (node.type === "Function") {
      return {
        type: "Function",
        from: this.resolve(node.from),
        to: this.resolve(node.to),
      };
    }

    if (node.type === "List") {
      return {
        type: "List",
        listType: this.resolve(node.listType),
      };
    }

    if (node.type === "Operator") {
      return {
        type: "Operator",
        obscured: this.resolve(
          node.obscured
        ) as TypeRawSignatureAST.RawSignatureFunction,
      };
    }

    return node;
  }
}
