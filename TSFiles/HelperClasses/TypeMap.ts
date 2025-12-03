import { IntegratedValue } from "../IntegratedDynamicsClasses/operators/Operator";

export class TypeMap {
  aliases: Map<any, any>;
  constructor(ast?: TypeRawSignatureAST.RawSignatureNode) {
    this.aliases = new Map();

    if (ast) {
      this.extractTypeIDs(ast);
    }
  }

  private extractTypeIDs(node: TypeRawSignatureAST.RawSignatureNode) {
    if (node.type === "Any") {
      this.aliases.set(node.typeID, "Any");
    }

    if (node.type === "Function") {
      this.extractTypeIDs(node.from);
      this.extractTypeIDs(node.to);
    }

    if (node.type === "List") {
      this.extractTypeIDs(node.listType);
    }
  }

  find(typeID: number) {
    while (this.aliases.has(typeID)) {
      typeID = this.aliases.get(typeID);
    }
    return typeID;
  }

  async unify(a: IntegratedValue, b: IntegratedValue): Promise<void> {
    const { Operator } = await import("../IntegratedDynamicsClasses/operators/Operator");

    if (typeof a === "boolean" || typeof b === "boolean") {
      return;
    }

    if (!(a instanceof Operator && b instanceof Operator)) {
      if (a.type === "Any" && b.type === "Any") {
        this.aliases.set(this.find(a.typeID), this.find(b.typeID));
        return;
      }

      if (a.type === "Any" && b.type !== "Any") {
        this.aliases.set(this.find(a.typeID), b);
        return;
      }
      if (b.type === "Any" && a.type !== "Any") {
        this.aliases.set(this.find(b.typeID), a);
        return;
      }

      if (a.type === "List" && b.type === "List") {
        if (typeof a.listType !== "string" && typeof b.listType !== "string")
          this.unify(a.listType, b.listType);
        return;
      }

      if (a.type !== b.type) {
        throw new Error(`Type mismatch: ${a.type} vs ${b.type}`);
      }

      if (a.type === "Function" && b.type === "Function") {
        this.unify(a.from, b.from);
        this.unify(a.to, b.to);
        return;
      }
    }

    if (a instanceof Operator && b instanceof Operator) {
      return this.unify(a.parsedSignature.getAST(), b.parsedSignature.getAST());
    }
    throw new Error(
      `Unhandled unify case: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`
    );
  }

  rewrite(
    node: TypeRawSignatureAST.RawSignatureNode
  ): TypeRawSignatureAST.RawSignatureNode {
    if (node.type === "Any" && node.typeID) {
      return { ...node, typeID: this.find(node.typeID) };
    }

    if (node.type === "Function") {
      return {
        type: "Function",
        from: this.rewrite(node.from),
        to: this.rewrite(node.to),
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
      const alias = this.aliases.get(node.typeID);
      if (alias) {
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

    return node;
  }
}
