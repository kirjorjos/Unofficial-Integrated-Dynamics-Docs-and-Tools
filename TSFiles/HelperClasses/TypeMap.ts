import { ParsedSignature } from "./ParsedSignature";

export class TypeMap {
  private static maxVarID = 0;
  private static unificationVersion = 0;

  getNewVarID(): number {
    return TypeMap.maxVarID++;
  }

  aliases: Map<number, number | ParsedSignature>;
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

  findBase(typeID: number) {
    const baseID = this.findBaseID(typeID);
    if (this.aliases.has(baseID)) return this.aliases.get(baseID)!;
    return baseID;
  }

  /**
   * Sets a and b to be equal in the alias map
   * @param a The first node
   * @param b The second node
   */
  unify(
    a: ParsedSignature,
    b: ParsedSignature,
    isRoot = true
  ): ErrorInfo | null {
    if (isRoot) TypeMap.unificationVersion++;

    if (a.getRootType() === "Function" && b.getRootType() === "Function") {
      const inputError = this.unify(a.getInput(), b.getInput(), false);
      if (inputError) return inputError;
      const outputError = this.unify(a.getOutput(), b.getOutput(), false);
      if (outputError) return outputError;
      return null;
    }

    if (a.getRootType() === "Operator" && b.getRootType() === "Operator") {
      const outputError = this.unify(a.getOutput(), b.getOutput(), false);
      if (outputError) return outputError;
      return null;
    }

    if (
      (a.getRootType() === "Operator" || b.getRootType() === "Operator") &&
      a.getRootType() !== b.getRootType() &&
      ![a.getRootType(), b.getRootType()].includes("Any")
    ) {
      const aIsOp = a.getRootType() === "Operator";
      const operatorNode = aIsOp ? a : b;
      const otherNode = aIsOp ? b : a;

      if (otherNode.getRootType() === "Function") {
        const error = this.unify(otherNode, operatorNode.getOutput(), false);
        if (error) return error;
        return null;
      }

      return {
        message: `Tried to unify Operator with ${otherNode.getRootType()}`,
        nodeA: a,
        nodeB: b,
      };
    }

    if (a.getRootType() === "List" && b.getRootType() === "List") {
      const outputError = this.unify(a.getOutput(), b.getOutput(), false);
      if (outputError) return outputError;
      return null;
    }

    if (a.getRootType() === "Any" && b.getRootType() === "Any") {
      const aBaseID = this.findBaseID(a.getTypeID());
      const bBaseID = this.findBaseID(b.getTypeID());
      if (aBaseID === bBaseID) return null;
      this.aliases.set(aBaseID, bBaseID);
      return null;
    }

    if (a.getRootType() === "Any" && b.getRootType() !== "Any") {
      return this.unify(b, a, false); // reuse the logic below
    }
    if (a.getRootType() !== "Any" && b.getRootType() === "Any") {
      const bBaseAlias = this.findBase(b.getTypeID());
      if (bBaseAlias instanceof ParsedSignature) {
        // b has an solid type alias
        return this.unify(a, bBaseAlias, false);
      }
      this.aliases.set(bBaseAlias, a);
      return null;
    }

    if (ParsedSignature.typeEquals(a.getRootType(), b.getRootType()))
      return null;

    if (a.getRootType() !== b.getRootType()) {
      return {
        message: `Type Mismatch: ${a.getRootType()} vs ${b.getRootType()}`,
        nodeA: a,
        nodeB: b,
      };
    }

    return null;
  }

  getUnificationVersion() {
    return TypeMap.unificationVersion;
  }
}

export const globalMap = new TypeMap();
