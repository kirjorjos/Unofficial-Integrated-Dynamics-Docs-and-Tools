export class TypeMap {
  private static maxVarID = 0;

  getNewVarID(): number {
    return TypeMap.maxVarID++;
  }

  private static NUMBER_TYPES = ["Integer", "Long", "Double", "Number"];

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
    TypeMap.validateNode(a);
    TypeMap.validateNode(b);

    a = this.resolve(a);
    b = this.resolve(b);

    if (a.type === "Function" && b.type === "Function") {
      this.unify(a.from, b.from);
      this.unify(a.to, b.to);
      return;
    }

    if (a.type === "Operator" && b.type === "Operator") {
      this.unify(a.obscured, b.obscured);
      return;
    }

    if (
      (a.type === "Operator" || b.type === "Operator") &&
      a.type !== b.type &&
      ![a.type, b.type].includes("Any")
    ) {
      const aIsOp = a.type === "Operator";
      const operatorNode = (
        aIsOp ? a : b
      ) as TypeRawSignatureAST.RawSignatureOperator;
      const otherNode = aIsOp ? b : a;

      if (otherNode.type === "Function") {
        this.unify(otherNode, operatorNode.obscured);
        return;
      }

      throw new Error(
        `Tried to unify Operator with ${otherNode.type}: \n${JSON.stringify(
          a,
          null,
          2
        )} vs 
        ${JSON.stringify(b, null, 2)}`
      );
    }

    if (a.type === "List" && b.type === "List") {
      this.unify(a.listType, b.listType);
    }

    if (
      TypeMap.NUMBER_TYPES.includes(a.type) &&
      TypeMap.NUMBER_TYPES.includes(b.type)
    )
      return;

    if (a.type === "Any" && b.type === "Any") {
      const aBaseID = this.findBaseID(a.typeID);
      const bBaseID = this.findBaseID(b.typeID);
      if (aBaseID === bBaseID) return;
      this.aliases.set(aBaseID, bBaseID);
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

    if (a.type !== b.type) {
      throw new Error(`Type Mismatch: ${a.type} vs ${b.type}`);
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
      if (!node.from || !node.to) {
        console.error("Malformed Function node in rewrite:", node);
        throw new Error("Malformed Function node in rewrite");
      }
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
    if (!node) {
      throw new Error("TypeMap.resolve was called with an undefined node.");
    }
    if (node.type === "Any") {
      let alias = this.aliases.get(node.typeID);
      if (alias) {
        if (typeof alias === "number") {
          alias = this.findBaseID(alias);
          alias = this.aliases.get(alias);
          if (typeof alias === "number") return node;
          if (!alias) {
            return node;
          }
        }
        return this.resolve(alias);
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

  private static validateNode(n: any) {
    if (!n || !n.type) {
      console.error("Malformed AST node in unify:", n);
      throw new Error("Malformed AST node in unify");
    }
    if (n.type === "Function" && (!n.from || !n.to)) {
      console.error("Malformed Function node in unify:", n);
      throw new Error("Malformed Function node in unify");
    }
  }
}

export const globalMap = new TypeMap();
