import { globalMap } from "./TypeMap";

export class ParsedSignature {
  private static maxTypeID = 0;
  private static NUMBER_TYPES = ["Integer", "Long", "Double", "Number"];
  private static NAMED_TYPES = [
    "String",
    "Ingredients",
    "Recipe",
    "NBT",
    ...this.NUMBER_TYPES,
    "Block",
    "Item",
    "Fluid",
    "Entity",
    "List",
    "Operator",
  ];
  private static UNIQUELY_NAMED_TYPES = [
    "Block",
    "Entity",
    "Operator",
    "Item",
    "Fluid",
  ];

  private ast: TypeRawSignatureAST.RawSignatureNode;
  public errorInfo: ErrorInfo | null = null;
  private _cachedRewrite: ParsedSignature | null = null;
  private _cachedAtVersion: number = -1;
  private inputCache = [] as ParsedSignature[];
  private outputCache = [] as ParsedSignature[];

  public static resetTypeIDCounter() {
    ParsedSignature.maxTypeID = 0;
  }

  constructor(ast: TypeRawSignatureAST.RawSignatureNode, normalize = true) {
    this.ast = normalize ? this._normalize(ast) : ast;
  }

  _normalize(
    node: TypeRawSignatureAST.RawSignatureNode
  ): TypeRawSignatureAST.RawSignatureNode {
    const id_map = new Map<number, number>();

    const remap = (
      node: TypeRawSignatureAST.RawSignatureNode
    ): TypeRawSignatureAST.RawSignatureNode => {
      if (node.type === "Function") {
        if (!node.from || !node.to) {
          console.error("Malformed Function node in remap:", node);
          throw new Error("Malformed Function node in remap");
        }
        return {
          type: "Function",
          from: remap(node.from),
          to: remap(node.to),
        };
      }

      if (node.type === "List") {
        return {
          type: "List",
          listType: remap(node.listType),
        };
      }

      if (node.type === "Any") {
        if (!id_map.has(node.typeID)) {
          id_map.set(node.typeID, ParsedSignature.getNewTypeID());
        }
        return {
          type: "Any",
          typeID: id_map.get(node.typeID)!,
        };
      }

      if (node.type === "Operator") {
        return {
          type: "Operator",
          obscured: remap(
            node.obscured
          ) as TypeRawSignatureAST.RawSignatureFunction,
        };
      }

      return node;
    };

    return remap(node);
  }

  getAst() {
    return this.ast;
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
    if (index < this.inputCache.length) return this.inputCache[index]!;
    if (this.ast.type !== "Function") {
      throw new Error(
        `Cannot get input of a non-function signature. Got ${this.ast.type}`
      );
    }
    let current = this.ast;

    for (let i = 0; i < index; i++) {
      if (current.to && current.to.type === "Function") {
        current = current.to;
      } else {
        throw new Error(
          `No input at index ${index} in signature: ${JSON.stringify(this.ast, null, 2)}`
        );
      }
    }

    const result = new ParsedSignature(current.from, false);
    if (this.errorInfo) result.errorInfo = this.errorInfo;
    this.inputCache[index] = result;
    return result;
  }

  getOutput(index = 0): ParsedSignature {
    if (index < this.outputCache.length && this.outputCache[index])
      return this.outputCache[index]!;
    if (this.ast.type === "Operator") {
      const result = new ParsedSignature(this.ast.obscured, false);
      if (this.errorInfo) result.errorInfo = this.errorInfo;
      this.outputCache[0] = result;
      return result;
    }
    if (this.ast.type === "List") {
      const result = new ParsedSignature(this.ast.listType, false);
      if (this.errorInfo) result.errorInfo = this.errorInfo;
      this.outputCache[0] = result;
      return result;
    }
    if (index < 0) index = this.getArity() + index;
    if (this.ast.type !== "Function") {
      throw new Error(
        `Cannot get output of a non-function signature. Got ${this.ast.type}`
      );
    }
    let current = this.ast;

    for (let i = 0; i < index; i++) {
      if (current.to && current.to.type === "Function") {
        current = current.to;
      } else {
        throw new Error(
          `Expected index less than arity, got index ${index} and arity ${this.getArity()} in signature: ${JSON.stringify(this.ast, null, 2)}`
        );
      }
    }

    const result = new ParsedSignature(current.to, false);
    if (this.errorInfo) result.errorInfo = this.errorInfo;
    this.outputCache[index] = result;
    return result;
  }

  pipe(other: ParsedSignature): ParsedSignature {
    if (this.errorInfo) {
      const errorSig = new ParsedSignature(this.ast, false);
      errorSig.errorInfo = this.errorInfo;
      return errorSig;
    }
    if (other.errorInfo) {
      const errorSig = new ParsedSignature(other.ast, false);
      errorSig.errorInfo = other.errorInfo;
      return errorSig;
    }

    if (this.ast.type !== "Function" || other.ast.type !== "Function") {
      const errorSig = new ParsedSignature(this.ast, false);
      errorSig.errorInfo = {
        message:
          "Can only pipe operators, not values (Inputs must be functions)",
        nodeA: this,
        nodeB: other,
      };
      return errorSig;
    }

    const unifyError = globalMap.unify(this.getOutput(), other.getInput());

    const pipedAst: TypeRawSignatureAST.RawSignatureFunction = {
      type: "Function",
      from: this.getInput().ast,
      to: other.getOutput().ast,
    };

    const newSignature = new ParsedSignature(pipedAst, false);

    if (unifyError && !newSignature.errorInfo) {
      newSignature.errorInfo = unifyError;
    }

    return newSignature;
  }

  /**
   * pipe2(arg1, arg2, arg3)
   * @param this arg1
   * @param op1 arg2
   * @param op2 arg3
   */
  pipe2(op1: ParsedSignature, op2: ParsedSignature): ParsedSignature {
    if (this.errorInfo) {
      const errorSig = new ParsedSignature(this.ast, false);
      errorSig.errorInfo = this.errorInfo;
      return errorSig;
    }
    if (op1.errorInfo) {
      const errorSig = new ParsedSignature(op1.ast, false);
      errorSig.errorInfo = op1.errorInfo;
      return errorSig;
    }
    if (op2.errorInfo) {
      const errorSig = new ParsedSignature(op2.ast, false);
      errorSig.errorInfo = op2.errorInfo;
      return errorSig;
    }

    if (
      this.ast.type !== "Function" ||
      op1.ast.type !== "Function" ||
      op2.ast.type !== "Function"
    ) {
      const errorSig = new ParsedSignature(this.ast, false);
      errorSig.errorInfo = {
        message:
          "Can only pipe2 operators, not values (Inputs must be functions)",
        nodeA: this,
        nodeB: op1,
        nodeC: op2,
      };
      return errorSig;
    }

    const unifyError1 = globalMap.unify(this.getInput(), op1.getInput());
    const unifyError2 = globalMap.unify(this.getOutput(), op2.getInput());
    const unifyError3 = globalMap.unify(op1.getOutput(), op2.getInput(1));

    const pipedAst: TypeRawSignatureAST.RawSignatureFunction = {
      type: "Function",
      from: op1.getInput().ast,
      to: op2.getOutput(1).ast,
    };

    const newSignature = new ParsedSignature(pipedAst, false);

    if (unifyError1 && !newSignature.errorInfo) {
      newSignature.errorInfo = unifyError1;
    }
    if (unifyError2 && !newSignature.errorInfo) {
      newSignature.errorInfo = unifyError2;
    }
    if (unifyError3 && !newSignature.errorInfo) {
      newSignature.errorInfo = unifyError3;
    }

    return newSignature;
  }

  apply(argType: ParsedSignature): ParsedSignature {
    if (this.errorInfo) {
      const errorSig = new ParsedSignature(this.ast, false);
      errorSig.errorInfo = this.errorInfo;
      return errorSig;
    }
    if (argType.errorInfo) {
      const errorSig = new ParsedSignature(argType.ast, false);
      errorSig.errorInfo = argType.errorInfo;
      return errorSig;
    }

    if (this.ast.type !== "Function") {
      const errorSig = new ParsedSignature(this.ast, false);
      errorSig.errorInfo = {
        message: "Cannot apply to a non-function signature",
        nodeA: this,
        nodeB: argType,
      };
      return errorSig;
    }

    const expected = this.getInput();
    const unifyError = globalMap.unify(argType, expected);

    const resultRawAst = this.getOutput().ast;
    const resultSignature = new ParsedSignature(resultRawAst, false);

    if (unifyError && !resultSignature.errorInfo) {
      resultSignature.errorInfo = unifyError;
    }

    // const rewrittenSignature = resultSignature.rewrite();
    return resultSignature;
  }

  flip() {
    if (this.ast.type !== "Function" || this.ast.to.type !== "Function") {
      throw new Error('Flip needs at least 2 "inputs".');
    }

    const a = this.ast.from;
    const b = this.ast.to.from;
    const rest = this.ast.to.to;

    const flipped: TypeRawSignatureAST.RawSignatureFunction = {
      type: "Function",
      from: b,
      to: {
        type: "Function",
        from: a,
        to: rest,
      },
    };

    return new ParsedSignature(flipped, false);
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

  getRootType() {
    return this.ast.type;
  }

  getTypeID() {
    if (this.ast.type !== "Any")
      throw new Error("Can't get the type ID of a non-Any node");
    return this.ast.typeID;
  }

  rewrite(): ParsedSignature {
    if (this.errorInfo) {
      throw new Error(`Type error during rewrite: ${this.errorInfo.message}`);
    }
    const currentVersion = globalMap.getUnificationVersion();
    if (this._cachedRewrite && this._cachedAtVersion === currentVersion) {
      return this._cachedRewrite;
    }

    let finalSignature: ParsedSignature;

    if (this.ast.type === "Any") {
      const alias = globalMap.findBase(this.ast.typeID);
      if (alias instanceof ParsedSignature) {
        finalSignature = alias.rewrite();
      } else {
        finalSignature = this;
      }
    } else if (this.ast.type === "Function") {
      const rewrittenInput = this.getInput().rewrite();
      const rewrittenOutput = this.getOutput().rewrite();
      const newAst: TypeRawSignatureAST.RawSignatureFunction = {
        type: "Function",
        from: rewrittenInput.ast,
        to: rewrittenOutput.ast,
      };
      finalSignature = new ParsedSignature(newAst, false);
    } else if (this.ast.type === "List") {
      const rewrittenListType = this.getOutput().rewrite();
      const newAst: TypeRawSignatureAST.RawSignatureList = {
        type: "List",
        listType: rewrittenListType.ast,
      };
      finalSignature = new ParsedSignature(newAst, false);
    } else if (this.ast.type === "Operator") {
      const rewrittenObscured = this.getOutput().rewrite();
      const newAst: TypeRawSignatureAST.RawSignatureOperator = {
        type: "Operator",
        obscured:
          rewrittenObscured.ast as TypeRawSignatureAST.RawSignatureFunction,
      };
      finalSignature = new ParsedSignature(newAst, false);
    } else {
      finalSignature = this;
    }

    finalSignature.errorInfo = this.errorInfo;

    this._cachedRewrite = finalSignature;
    this._cachedAtVersion = currentVersion;

    return finalSignature;
  }

  static getNewTypeID(): number {
    return ParsedSignature.maxTypeID++;
  }

  static typeEquals(
    a: TypeRawSignatureAST.RawSignatureNode["type"],
    b: TypeRawSignatureAST.RawSignatureNode["type"]
  ): boolean {
    if (a === b) return true;
    if (
      ParsedSignature.NUMBER_TYPES.includes(a) &&
      ParsedSignature.NUMBER_TYPES.includes(b)
    )
      return true;
    if (["Named", "UniquelyNamed"].includes(b))
      return ParsedSignature.typeEquals(b, a); // ensure that "a" is the generic type
    if (a === "Named") return ParsedSignature.NAMED_TYPES.includes(b);
    if (a === "UniquelyNamed")
      return ParsedSignature.UNIQUELY_NAMED_TYPES.includes(b);
    return false;
  }
}
