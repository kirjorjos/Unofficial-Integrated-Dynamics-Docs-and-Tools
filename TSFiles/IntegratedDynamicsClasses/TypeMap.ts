import {
  TypeAny,
  TypeConcrete,
  TypeFunction,
  TypeGeneric,
  TypeList,
  TypeOperator,
} from "../types";

export class TypeMap {
  aliases: Map<any, any>;
  constructor(
    ast?: TypeAny | TypeConcrete | TypeGeneric | TypeFunction | TypeOperator
  ) {
    this.aliases = new Map();

    if (ast) {
      this.extractTypeIDs(ast);
    }
  }

  private extractTypeIDs(node: any) {
    if (!node || typeof node !== "object") return;

    if (node.kind === "Generic" && node.typeID) {
      this.aliases.set(node.typeID, "Any");
    }

    // Recurse through all child properties
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) {
        value.forEach((v) => this.extractTypeIDs(v));
      } else if (typeof value === "object" && value !== null) {
        this.extractTypeIDs(value);
      }
    }
  }

  find(typeID: string) {
    while (this.aliases.has(typeID)) {
      typeID = this.aliases.get(typeID);
    }
    return typeID;
  }

  unify<
    T extends
      | TypeAny
      | TypeConcrete
      | TypeGeneric
      | TypeList
      | TypeFunction
      | TypeOperator,
  >(a: T, b: typeof a) {
    if (!a || !b) return;

    const repA = this._getID(a);
    const repB = this._getID(b);

    if (repA && repB) {
      this.aliases.set(this.find(repA), this.find(repB));
      return;
    }

    if (a.kind === "Concrete" && b.kind === "Concrete") {
      if (a.name !== b.name) {
        throw new Error(`Concrete type mismatch: ${a.name} vs ${b.name}`);
      }

      const pa = (a.name === "List" ? (a as TypeList).params : []) ?? [];
      const pb = (b.name === "List" ? (b as TypeList).params : []) ?? [];

      const n = Math.min(pa.length, pb.length);
      for (let i = 0; i < n; i++) this.unify(pa[i], pb[i]);
      return;
    }
  }

  _getID(
    node:
      | TypeAny
      | TypeGeneric
      | TypeConcrete
      | TypeList
      | TypeFunction
      | TypeOperator
  ) {
    if (node.kind === "Any") return node.typeID;
    if (node.kind === "Generic") return node.name;
    return null;
  }

  rewrite(
    node: TypeAny | TypeConcrete | TypeFunction | TypeGeneric | TypeList
  ): TypeAny | TypeConcrete | TypeFunction | TypeGeneric | TypeList {
    if (node.kind === "Any" && node.typeID) {
      return { ...node, typeID: this.find(node.typeID) };
    }
    if (node.kind === "Generic" && node.name) {
      return { ...node, name: this.find(node.name) };
    }
    if (node.kind === "Function") {
      return {
        kind: "Function",
        from: this.rewrite(node.from),
        to: this.rewrite(node.to),
      };
    }
    if (node.kind === "Concrete" && node.name === "List" && node.params) {
      return {
        kind: "Concrete",
        name: node.name,
        params: node.params.map((p) => this.rewrite(p)),
      } as TypeList;
    }
    return node;
  }

  resolve(
    node: TypeAny | TypeGeneric | TypeConcrete | TypeFunction | TypeList
  ): typeof node {
    if (node.kind === "Any") {
      const alias = this.aliases.get(node.typeID);
      if (alias) {
        return this.resolve(alias as any);
      }
      return node;
    }

    if (node.kind === "Generic") {
      const resolvedTypeID = this.aliases.get(node.name);
      if (resolvedTypeID) {
        const resolved = this.aliases.get(resolvedTypeID);
        if (!resolved)
          throw new Error(
            `TypeMap inconsistency: alias ${resolvedTypeID} not found`
          );
        return this.resolve(resolved);
      }
      return node;
    }

    if (node.kind === "Function") {
      return {
        kind: "Function",
        from: this.resolve(node.from),
        to: this.resolve(node.to),
      };
    }

    if (node.kind === "Concrete") {
      if (node.name === "List") {
        return {
          kind: "Concrete",
          name: "List",
          params: (node as TypeList).params.map((p) => this.resolve(p)),
        } as TypeList;
      }
      return node as TypeConcrete;
    }

    throw new Error(`Unknown node kind in resolve: ${JSON.stringify(node)}`);
  }
}
