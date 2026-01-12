import { TypeMap } from "./TypeMap";

export class ParsedSignature {
  ast: TypeRawSignatureAST.RawSignatureFunction;
  TypeIDCounter: number;
  typeMap: TypeMap;
  flatArgs: (TypeRawSignatureAST.RawSignatureDefiniteValue["type"] | "Any")[];

  constructor(
    ast: TypeRawSignatureAST.RawSignatureNode,
    typeMap: TypeMap = new TypeMap()
  ) {
    this.ast = this._normalize(ast) as TypeRawSignatureAST.RawSignatureFunction;
    this.TypeIDCounter = 0;
    this.typeMap = typeMap;
    this.flatArgs = this.toFlatSignature();
  }

  getTypeMap(): TypeMap {
    return this.typeMap;
  }

  getAST() {
    return JSON.parse(JSON.stringify(this.ast));
  }

  _normalize(
    node: TypeRawSignatureAST.RawSignatureNode
  ): TypeRawSignatureAST.RawSignatureNode {
    let baseIDs = new Set();
    let toAdd = this.TypeIDCounter;

    function normalize(
      node: TypeRawSignatureAST.RawSignatureNode
    ): TypeRawSignatureAST.RawSignatureNode {
      if (node.type === "Function") {
        return {
          type: "Function",
          from: normalize(node.from),
          to: normalize(node.to),
        };
      }

      if (node.type === "List") {
        return {
          type: "List",
          listType: normalize(node.listType),
        };
      }

      if (node.type === "Any") {
        baseIDs.add(node.typeID);
        return {
          type: "Any",
          typeID: node.typeID + toAdd,
        };
      }

      return node;
    }

    node = normalize(node);
    this.TypeIDCounter += baseIDs.size;
    return node;
  }

  rename(mapping: TypeTypeMap): ParsedSignature {
    const renameNode = (
      node: TypeRawSignatureAST.RawSignatureNode
    ): TypeRawSignatureAST.RawSignatureNode => {
      if (!node) return node;

      if (node.type === "List") {
        return Object.assign({}, node, {
          listType: renameNode(node.listType),
        });
      }

      if (node.type === "Any") {
        const key = node.typeID;
        if (mapping[key]) {
          return {
            type: mapping[key],
          } as unknown as TypeRawSignatureAST.RawSignatureDefiniteValue;
        } else return node;
      }

      if (node.type === "Function") {
        return {
          ...node,
          from: renameNode(node.from),
          to: renameNode(node.to),
        };
      }

      return node;
    };
    return new ParsedSignature(renameNode(this.ast), this.typeMap);
  }

  clone() {
    return new ParsedSignature(
      JSON.parse(JSON.stringify(this.ast)),
      this.typeMap
    );
  }

  getArity() {
    if (this.ast.type === "Function") {
      let count = 0;
      let current = this.ast as TypeRawSignatureAST.RawSignatureNode;
      while (current.type === "Function") {
        count++;
        current = current.to;
      }
      return count;
    }
    return 0;
  }

  getInput(index = 0) {
    let current = this.ast as TypeRawSignatureAST.RawSignatureFunction;

    for (let i = 0; i < index; i++) {
      if (current.to && current.to.type === "Function") {
        current = current.to;
      } else {
        throw new Error(
          `No input at index ${index} in signature: ${JSON.stringify(this.ast, null, 2)}`
        );
      }
    }

    return this.typeMap.resolve(current.from);
  }

  getOutput(index = 0) {
    let current = this.ast as TypeRawSignatureAST.RawSignatureFunction;

    for (let i = 0; i < index; i++) {
      if (current.to && current.to.type === "Function") {
        current = current.to;
      } else {
        throw new Error(
          `Expected index less than arity, got index ${index} and arity ${this.getArity()} in signature: ${JSON.stringify(this.ast, null, 2)}`
        );
      }
    }

    return this.typeMap.resolve(current.to);
  }

  pipe(other: ParsedSignature) {
    if (this.ast.type !== "Function" || other.ast.type !== "Function") {
      throw new Error("Can only pipe operators, not values");
    }
    const out = this.getOutput();
    const input = other.getInput();

    this.typeMap.unify(out, input);

    const newAST = Object.assign({}, this.ast, {
      type: "Function",
      from: this.ast.from,
      to: other.getOutput(),
    });

    return new ParsedSignature(newAST, this.typeMap);
  }

  apply(argType: TypeRawSignatureAST.RawSignatureNode): ParsedSignature {
    if (this.ast.type !== "Function") {
      throw new Error("Cannot apply to a value");
    }

    const expected = this.getInput();
    this.typeMap.unify(argType, expected);

    const newAst = this.typeMap.rewrite(this.ast.to);
    return new ParsedSignature(newAst, this.typeMap);
  }

  flip() {
    if (this.ast.type !== "Function" || this.ast.to.type !== "Function") {
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

  toFlatSignature(): TypeRawSignatureAST.RawSignatureNode["type"][] {
    const arr = [];
    let current = this.ast as TypeRawSignatureAST.RawSignatureNode;
    while (current.type === "Function") {
      arr.push(current.from.type);
      current = current.to;
    }
    arr.push(current.type);
    return arr as TypeRawSignatureAST.RawSignatureNode["type"][];
  }
}
