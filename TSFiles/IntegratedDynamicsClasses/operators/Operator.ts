import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { ParsedSignature } from "../../HelperClasses/ParsedSignature";
import { globalMap } from "../../HelperClasses/TypeMap";
import { UniquelyNamed } from "IntegratedDynamicsClasses/UniquelyNamed";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Named } from "IntegratedDynamicsClasses/Named";
import { BaseOperator } from "./BaseOperator";

export class Operator<I extends IntegratedValue, O extends IntegratedValue>
  implements IntegratedValue, UniquelyNamed, Named
{
  private fn: Function;
  private parsedSignature: ParsedSignature;
  static readonly internalName: string;
  readonly _output!: O;
  private varID: number;
  interactName: string;
  lastSeralizer: "apply" | "pipe" | "pipe2" | "flip" | null;
  argTypes: string[];
  baseDisplayName: string;

  constructor({
    parsedSignature,
    function: fn,
    interactName,
    lastSerializer,
    argTypes,
    baseDisplayName,
  }: {
    parsedSignature: ParsedSignature;
    function: Function;
    interactName?: string;
    lastSerializer?: "apply" | "pipe" | "pipe2" | "flip";
    argTypes?: string[];
    baseDisplayName?: string;
  }) {
    this.fn = fn;
    this.parsedSignature = Operator.unwrapOperatorSignature(parsedSignature);
    this.varID = globalMap.getNewVarID();
    this.interactName = interactName ?? "curried_operator";
    this.lastSeralizer = lastSerializer ?? null;
    this.argTypes = argTypes ?? [];
    this.baseDisplayName = baseDisplayName ?? this.interactName;
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

    result.getSignatureNode().rewrite();
    return result;
  }

  apply(arg: I, updateSignature = true): O {
    if (arg instanceof Operator && arg.varID === this.varID)
      throw new Error("Tried to apply operator to it's self");

    let parsedSignature = this.parsedSignature;
    if (updateSignature)
      parsedSignature = parsedSignature.apply(arg.getSignatureNode());

    let newOp = this.fn(arg);
    if (typeof newOp != "function") {
      parsedSignature.rewrite();
      return newOp as O;
    }
    const typesArr = [...this.argTypes];
    typesArr.push(arg.getSignatureNode().getRootType());
    return new Operator<IntegratedValue, IntegratedValue>({
      function: newOp,
      parsedSignature,
      lastSerializer: "apply",
      argTypes: typesArr,
      baseDisplayName: this.baseDisplayName,
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
      lastSerializer: "flip",
      baseDisplayName: "Virtual Fliped Operator",
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
      lastSerializer: "pipe",
      baseDisplayName: "Virtual Piped Operator",
    });
  }

  /**
   * pipe2(arg1, arg2, arg3)
   * @param this arg1
   * @param op1 arg2
   * @param op2 arg3
   */
  pipe2<O2 extends IntegratedValue, V extends IntegratedValue>(
    op1: Operator<I, O2>,
    op2: Operator<O, Operator<O2, V>>
  ): IntegratedValue {
    if (op1.varID === this.varID || op2.varID === this.varID)
      throw new Error("Tried to pipe an operator into it's self");
    const newFn = (x: I): IntegratedValue => {
      return op2.apply(this.apply(x), false).apply(op1.apply(x), false);
    };
    const parsedSignature = this.parsedSignature.pipe2(
      op1.parsedSignature,
      op2.parsedSignature
    );
    return new Operator<V, IntegratedValue>({
      function: newFn,
      parsedSignature: parsedSignature,
      lastSerializer: "pipe2",
      baseDisplayName: "Virtual Piped 2 Operator",
    });
  }

  getFn(): Function {
    return this.fn;
  }

  getSignatureNode(): ParsedSignature {
    return this.parsedSignature;
  }

  private static unwrapOperatorSignature(parsedSignature: ParsedSignature) {
    return parsedSignature.getRootType() === "Operator"
      ? parsedSignature.getOutput()
      : parsedSignature;
  }

  getParsedSignature(): ParsedSignature {
    return this.parsedSignature;
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Operator)) return new iBoolean(false);
    return new iBoolean(this.fn.toString() == other.getFn().toString());
  }

  getUniqueName() {
    return new iString(
      (this.constructor as typeof Operator).internalName ??
        "integrateddynamics:curried_operator"
    );
  }

  getName(): iString {
    if (this instanceof BaseOperator) return new iString(this.interactName);
    if (this.lastSeralizer === "apply") {
      return new iString(
        `Applied ${this.baseDisplayName} [${this.argTypes.join("; ")}]`
      );
    } else {
      return new iString(this.baseDisplayName);
    }
  }
}
