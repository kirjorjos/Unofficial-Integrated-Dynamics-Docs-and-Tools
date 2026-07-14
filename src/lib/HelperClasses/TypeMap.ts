import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

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

  clear() {
    this.aliases.clear();
    TypeMap.maxVarID = 0;
    TypeMap.unificationVersion++;
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

      const aResolved = this.findBase(a.getTypeID());
      const bResolved = this.findBase(b.getTypeID());

      if (aResolved instanceof ParsedSignature && bResolved instanceof ParsedSignature) {
        // Both have concrete type aliases — unify them (may promote Named→String)
        return this.unify(aResolved, bResolved, false);
      }
      if (aResolved instanceof ParsedSignature) {
        // a has a concrete type — make b point to a (preserves a's alias)
        this.aliases.set(bBaseID, aBaseID);
      } else if (bResolved instanceof ParsedSignature) {
        // b has a concrete type — make a point to b
        this.aliases.set(aBaseID, bBaseID);
      } else {
        // Neither has a concrete type — normal behavior
        this.aliases.set(aBaseID, bBaseID);
      }
      return null;
    }

    if (a.getRootType() === "Any" && b.getRootType() !== "Any") {
      return this.unify(b, a, false); // reuse the logic below
    }
    if (a.getRootType() !== "Any" && b.getRootType() === "Any") {
      const bBaseAlias = this.findBase(b.getTypeID());
      if (bBaseAlias instanceof ParsedSignature) {
        /* 
        **b has a solid type alias — try to unify, and if the existing
        ** alias is a less-specific parent (Named/UniquelyNamed), promote
        ** it to the more specific concrete type
        */
        const error = this.unify(a, bBaseAlias, false);
        if (error) return error;
        const oldRoot = bBaseAlias.getRootType();
        const newRoot = a.getRootType();
        if (
          oldRoot !== newRoot &&
          (oldRoot === "Named" || oldRoot === "UniquelyNamed") &&
          newRoot !== "Named" &&
          newRoot !== "UniquelyNamed"
        ) {
          this.aliases.set(this.findBaseID(b.getTypeID()), a);
        }
        return null;
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
