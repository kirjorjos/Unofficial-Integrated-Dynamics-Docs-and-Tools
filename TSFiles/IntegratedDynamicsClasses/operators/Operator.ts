import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { ParsedSignature } from "../../HelperClasses/ParsedSignature";
import { globalMap } from "../../HelperClasses/TypeMap";
import { UniquelyNamed } from "IntegratedDynamicsClasses/UniquelyNamed";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Named } from "IntegratedDynamicsClasses/Named";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export interface IOperatorSerializationRegistry {
  curry: (
    base: Operator<IntegratedValue, IntegratedValue>,
    args: IntegratedValue[]
  ) => Operator<IntegratedValue, IntegratedValue>;
  pipe: (
    op1: Operator<IntegratedValue, IntegratedValue>,
    op2: Operator<any, IntegratedValue>
  ) => Operator<IntegratedValue, IntegratedValue>;
  pipe2: (
    op1: Operator<IntegratedValue, IntegratedValue>,
    op2: Operator<any, IntegratedValue>,
    op3: Operator<any, IntegratedValue>
  ) => Operator<IntegratedValue, IntegratedValue>;
  flip: (op: Operator<any, any>) => Operator<IntegratedValue, IntegratedValue>;
  serialize: (
    op: Operator<IntegratedValue, IntegratedValue>
  ) => Tag<IntegratedValue>;
  deserialize: (
    tag: Tag<IntegratedValue>
  ) => Operator<IntegratedValue, IntegratedValue>;
  DESERIALIZERS: Record<
    string,
    (tag: Tag<IntegratedValue>) => Operator<IntegratedValue, IntegratedValue>
  >;
}

export const OperatorSerializationRegistry: IOperatorSerializationRegistry = {
  curry: null as any,
  pipe: null as any,
  pipe2: null as any,
  flip: null as any,
  serialize: null as any,
  deserialize: null as any,
  DESERIALIZERS: {},
};

export class Operator<I extends IntegratedValue, O extends IntegratedValue>
  implements IntegratedValue, UniquelyNamed, Named
{
  private fn: Function;
  private parsedSignature: ParsedSignature;
  static readonly internalName: string;
  readonly _output!: O;
  private varID: number;
  interactName: string;
  baseDisplayName: string;

  constructor({
    parsedSignature,
    function: fn,
    interactName,
    baseDisplayName,
  }: {
    parsedSignature: ParsedSignature;
    function: Function;
    interactName?: string;
    baseDisplayName?: string;
  }) {
    this.fn = fn;
    this.parsedSignature = Operator.unwrapOperatorSignature(parsedSignature);
    this.varID = globalMap.getNewVarID();
    this.interactName = interactName ?? "curried_operator";
    this.baseDisplayName = baseDisplayName ?? this.interactName;
  }

  evaluate(...args: IntegratedValue[]) {
    const arity = this.parsedSignature.getArity();
    if (args.length !== arity) {
      throw new Error(`Operator expected ${arity} args, got ${args.length}`);
    }

    let result: IntegratedValue = this;
    for (let i = 0; i < args.length; i++) {
      if (!(result instanceof Operator)) {
        throw new Error(
          "Evaluation reached a non-operator before exhausting arguments"
        );
      }
      result = result.apply(args[i]);
    }

    return result;
  }

  apply(arg: I, updateSignature = true): O {
    if (arg instanceof Operator && arg.varID === this.varID)
      throw new Error("Tried to apply operator to it's self");

    let parsedSignature = this.parsedSignature;
    if (updateSignature && parsedSignature.getRootType() === "Function") {
      parsedSignature = parsedSignature.apply(arg.getSignatureNode());

      if (parsedSignature.errorInfo) {
        throw new Error(`Type mismatch: ${parsedSignature.errorInfo.message}`);
      }
    }

    let newOp = this.fn(arg);

    if (typeof newOp != "function") {
      if (updateSignature && parsedSignature.getRootType() === "Function") {
        parsedSignature.rewrite();
      }
      return newOp as O;
    }

    return OperatorSerializationRegistry.curry(this, [arg]) as unknown as O;
  }

  flip(): Operator<
    IntegratedValue,
    Operator<IntegratedValue, IntegratedValue>
  > {
    return OperatorSerializationRegistry.flip(this) as Operator<
      IntegratedValue,
      Operator<IntegratedValue, IntegratedValue>
    >;
  }

  pipe<V extends IntegratedValue>(otherOp: Operator<O, V>): Operator<I, V> {
    if (otherOp.varID === this.varID)
      throw new Error("Tried to pipe an operator into it's self");
    return OperatorSerializationRegistry.pipe(this, otherOp) as Operator<I, V>;
  }

  pipe2<O2 extends IntegratedValue, V extends IntegratedValue>(
    op1: Operator<I, O2>,
    op2: Operator<O, Operator<O2, V>>
  ): IntegratedValue {
    if (op1.varID === this.varID || op2.varID === this.varID)
      throw new Error("Tried to pipe an operator into it's self");
    return OperatorSerializationRegistry.pipe2(this, op1, op2);
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
    if ("name" in this && this.name === "BaseOperator")
      return new iString(this.interactName);
    return new iString(this.baseDisplayName);
  }
}
