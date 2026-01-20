import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { ParsedSignature } from "../../HelperClasses/ParsedSignature";
import { globalMap, TypeMap } from "../../HelperClasses/TypeMap";

export class Operator<I extends IntegratedValue, O extends IntegratedValue>
  implements IntegratedValue
{
  private fn: Function;
  private parsedSignature: ParsedSignature;
  private typeMap: TypeMap;
  readonly _output!: O;
  private varID: number;

  constructor({
    parsedSignature,
    function: fn,
  }: {
    parsedSignature: ParsedSignature;
    function: Function;
  }) {
    this.fn = fn;
    this.typeMap = parsedSignature.getTypeMap();
    this.parsedSignature = Operator.unwrapOperatorSignature(parsedSignature);
    this.varID = this.typeMap.getNewVarID();
  }

  evaluate(...args: IntegratedValue[]) {
    const arity = this.parsedSignature.getArity();
    if (args.length !== arity) {
      throw new Error(`Operator expected ${arity} args, got ${args.length}`);
    }

    args = args.reverse();
    let result: IntegratedValue = this;
    while (args.length > 0) {
      const currentArg = args.pop()!;
      result = (result as Operator<IntegratedValue, IntegratedValue>).apply(
        currentArg
      );
    }

    return result;
  }

  apply(arg: I, updateSignature = true): O {
    if (arg instanceof Operator && arg.varID === this.varID)
      throw new Error("Tried to apply operator to it's self");
    // this.typeMap.unify(
    //   this.parsedSignature.getInput(0),
    //   arg.getSignatureNode()
    // );
    let parsedSignature = this.parsedSignature;
    if (updateSignature) parsedSignature = parsedSignature.apply(arg.getSignatureNode());

    let newOp = this.fn(arg);
    if (typeof newOp != "function") return newOp as O;
    return new Operator<IntegratedValue, IntegratedValue>({
      function: newOp,
      parsedSignature,
    }) as unknown as O;
  }

  flip(): Operator<
    IntegratedValue,
    Operator<IntegratedValue, IntegratedValue>
  > {
    const newFn = (
      arg1: IntegratedValue
    ): TypeLambda<IntegratedValue, IntegratedValue> => {
      return (arg2: IntegratedValue): IntegratedValue => {
        return (
          this.apply(arg2 as I) as unknown as Operator<
            IntegratedValue,
            IntegratedValue
          >
        ).apply(arg1);
      };
    };
    const newSignature = this.parsedSignature.flip();
    return new Operator<
      IntegratedValue,
      Operator<IntegratedValue, IntegratedValue>
    >({
      parsedSignature: newSignature,
      function: newFn as unknown as TypeLambda<
        IntegratedValue,
        Operator<IntegratedValue, IntegratedValue>
      >,
    });
  }

  pipe<V extends IntegratedValue>(otherOp: Operator<O, V>) {
    if (otherOp.varID === this.varID)
      throw new Error("Tried to pipe an operator into it's self");
    const newFn = (x: I): V => {
      return otherOp.apply(this.apply(x));
    };
    const newSignature = this.parsedSignature.pipe(otherOp.parsedSignature);
    return new Operator<I, V>({
      parsedSignature: newSignature,
      function: newFn,
    });
  }

  /**
   * pipe2(arg1, arg2, arg3)
   * @param op1 arg1
   * @param op2 arg2
   * @param this arg3
   */
  pipe2<V extends IntegratedValue>(op1: Operator<V, I>, op2: Operator<V, I>): IntegratedValue {
    if (op1.varID === this.varID || op2.varID === this.varID) throw new Error("Tried to pipe an operator into it's self");
    const newFn = (x: V): IntegratedValue => {
      return (this.apply(op1.apply(x, false) as I, false) as unknown as Operator<IntegratedValue, IntegratedValue>).apply(op2.apply(x, false), false);
    }
    const parsedSignature = globalMap.rewrite(this.parsedSignature.getOutput())
    return new Operator<V, IntegratedValue>({
      function: newFn,
      parsedSignature: new ParsedSignature(parsedSignature, globalMap)
    });
  }

  getFn(): Function {
    return this.fn;
  }

  getSignatureNode(): TypeRawSignatureAST.RawSignatureNode {
    return {
      type: "Operator",
      obscured: this.parsedSignature.ast,
    } as TypeRawSignatureAST.RawSignatureOperator;
  }

  private static unwrapOperatorSignature(parsedSignature: ParsedSignature) {
    const ast = parsedSignature.getAST();
    if (ast.type === "Operator") {
      return new ParsedSignature(ast.obscured, parsedSignature.getTypeMap());
    } else return parsedSignature;
  }

  getParsedSignature(): ParsedSignature {
    return this.parsedSignature;
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Operator)) return new iBoolean(false);
    return new iBoolean(this.fn.toString() == other.getFn().toString());
  }
}
