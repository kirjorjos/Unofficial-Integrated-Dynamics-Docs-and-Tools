import {
  TypeOperator,
  TypeFunction,
  TypeConcrete,
  TypeGeneric,
  TypeAny,
  TypeList,
  TypeTypeMap,
} from "../types";
import { TypeMap } from "./TypeMap";

export class ParsedSignature {
  ast: TypeOperator | TypeFunction;
  counter: number;
  typeMap: TypeMap;
  args: (
    | string
    | TypeFunction
    | TypeConcrete
    | TypeGeneric
    | TypeAny
    | TypeList
    | TypeOperator
  )[];

  constructor(
    ast:
      | TypeOperator
      | TypeList
      | TypeAny
      | TypeConcrete
      | TypeFunction
      | TypeGeneric,
    typeMap: TypeMap = new TypeMap()
  ) {
    this.ast = this._normalize(ast) as TypeOperator | TypeFunction;
    this.counter = 1;
    this.typeMap = typeMap;
    this.args = this.toFlatSignature();
  }

  getAST() {
    return JSON.parse(JSON.stringify(this.ast));
  }

  _normalize(
    node:
      | TypeOperator
      | TypeConcrete
      | TypeGeneric
      | TypeAny
      | TypeFunction
      | TypeList,
    argIndex = 1
  ):
    | TypeConcrete
    | TypeGeneric
    | TypeAny
    | TypeFunction
    | TypeList
    | TypeOperator {
    if (!node) return node;

    switch (node.kind) {
      case "Any": {
        return {
          ...node,
          typeID: `$type${this.counter++}`,
          argName: node.argName || `arg${argIndex}`,
        };
      }

      case "Generic": {
        return {
          ...node,
          name: `$${this.counter++}`,
          argName: node.argName || `arg${argIndex}`,
        };
      }

      case "Function": {
        return Object.assign({}, node, {
          kind: "Function",
          from: this._normalize(node.from, argIndex),
          to: this._normalize(node.to, argIndex + 1),
        });
      }

      case "Concrete": {
        if (node.name === "List") {
          return Object.assign({}, node, {
            kind: "Concrete",
            name: node.name,
            params: node.params.map((p, i) => this._normalize(p, argIndex + i)),
          });
        }
        return node;
      }
    }
    return node.args[0];
  }

  renameArgs(mapping: TypeTypeMap) {
    const rename = (
      node:
        | TypeList
        | TypeAny
        | TypeFunction
        | TypeGeneric
        | TypeConcrete
        | TypeOperator
    ): TypeList | TypeAny | TypeFunction | TypeGeneric | TypeConcrete => {
      if (!node) return node;

      if (node.kind === "Operator") return rename(node.args[0]);

      if (node.kind === "Concrete" && node.name === "List") {
        const listNode = node as TypeList;
        const params = listNode.params.map(rename) as (
          | TypeAny
          | TypeConcrete
          | TypeGeneric
          | TypeFunction
          | TypeList
        )[];
        return Object.assign({}, listNode, params) as TypeList;
      }

      if (node.kind === "Any" || node.kind === "Generic") {
        const key = node.kind === "Any" ? node.typeID : node.name;
        if (key && mapping[key]) {
          return { ...node, argName: mapping[key] } as TypeAny | TypeGeneric;
        } else return node;
      }

      if (node.kind === "Function") {
        return {
          ...node,
          from: rename(node.from),
          to: rename(node.to),
        } as TypeFunction;
      }

      return node;
    };
    return new ParsedSignature(rename(this.ast), this.typeMap);
  }

  clone() {
    return new ParsedSignature(
      JSON.parse(JSON.stringify(this.ast)),
      this.typeMap
    );
  }

  getArity() {
    if (this.ast.kind === "Function") {
      let count = 0;
      let current = this.ast as
        | TypeFunction
        | TypeGeneric
        | TypeConcrete
        | TypeAny
        | TypeList;
      while (current.kind === "Function") {
        count++;
        current = current.to;
      }
      return count;
    }
    if ("args" in this.ast) {
      return this.ast.args.length;
    }
    return 0;
  }
  getInput(index = 0) {
    if (!("args" in this.ast)) {
      throw new Error(
        `Invalid signature: ${JSON.stringify(this.ast, null, 2)}`
      );
    }
    if (!this.ast.args || index < 0 || index >= this.ast.args.length) {
      throw new Error(
        `Invalid input index ${index} for signature: ${JSON.stringify(this.ast, null, 2)}`
      );
    }

    const funcNode = this.ast.args[0];
    let current = funcNode;

    for (let i = 0; i < index; i++) {
      if (current.to && current.to.kind === "Function") {
        current = current.to;
      } else {
        throw new Error(
          `No input at index ${index} in signature: ${JSON.stringify(this.ast, null, 2)}`
        );
      }
    }

    return this.typeMap.resolve(current.from);
  }

  getOutput() {
    if (this.ast.kind === "Function") {
      return this.ast.to;
    }
    return this.ast;
  }

  pipe(other: ParsedSignature) {
    if (!this.args || other.args) {
      throw new Error("Can only pipe operators, not values");
    }
    const out = this.getOutput();
    const input = other.getInput();

    this.typeMap.unify(out, input);

    const newAST = Object.assign({}, this.ast, {
      kind: "Operator",
      args: [
        {
          kind: "Function",
          from:
            this.ast.kind === "Function"
              ? this.ast.from
              : this.ast.args[0].from,
          to: other.getOutput(),
        },
      ],
    });

    return new ParsedSignature(newAST, this.typeMap);
  }

  apply(
    argType: TypeFunction | TypeAny | TypeConcrete | TypeGeneric | TypeList
  ): ParsedSignature {
    if (this.ast.kind !== "Function") {
      throw new Error("Cannot apply non-function");
    }

    const expected = this.getInput(0);
    this.typeMap.unify(argType, expected);

    const newAst = this.typeMap.rewrite(this.ast.to);
    return new ParsedSignature(newAst, this.typeMap);
  }

  flip() {
    if (this.ast.kind !== "Function" || this.ast.to.kind !== "Function") {
      throw new Error('Flip needs 2 "inputs".');
    }

    const a = this.ast.from;
    const b = this.ast.to.from;
    const c = this.ast.to.to;

    const flipped = Object.assign({}, this.ast, {
      kind: "Function",
      from: b,
      to: {
        kind: "Function",
        from: a,
        to: c,
      },
    });

    return new ParsedSignature(flipped, this.typeMap);
  }

  toFlatSignature() {
    const arr = [];
    let cur = this.ast as
      | TypeFunction
      | TypeAny
      | TypeConcrete
      | TypeGeneric
      | TypeList;
    while (cur.kind === "Function") {
      arr.push(cur.from);
      cur = cur.to;
    }
    arr.push(cur);
    return arr;
  }
}
