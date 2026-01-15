import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { ParsedSignature } from "../../HelperClasses/ParsedSignature";
import { TypeMap } from "../../HelperClasses/TypeMap";

export class Operator<I extends IntegratedValue, O extends IntegratedValue>
  implements IntegratedValue
{
  fn: (arg: I) => IntegratedValue | TypeLambda<any, any>;
  parsedSignature: ParsedSignature;
  typeMap: TypeMap;
  readonly _output!: O;

  constructor({
    parsedSignature,
    function: fn,
  }: {
    parsedSignature: ParsedSignature;
    function: TypeLambda<I, O>;
  }) {
    this.fn = fn;
    this.typeMap = parsedSignature.getTypeMap();
    this.parsedSignature = parsedSignature;
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

  apply(arg: I): O {
    this.typeMap.unify(
      this.parsedSignature.getInput(0),
      arg.getSignatureNode()
    );
    const parsedSignature = this.parsedSignature.apply(arg.getSignatureNode());

    let newOp = this.fn(arg);
    if (typeof newOp != "function") return newOp as O;
    return new Operator<IntegratedValue, IntegratedValue>({
      function: newOp,
      parsedSignature
    }) as unknown as O;
  }

  pipe<V extends IntegratedValue>(otherOp: Operator<O, V>) {
    const newFn = (x: I): V => {
      return otherOp.apply(this.apply(x));
    };
    const newSignature = this.parsedSignature.pipe(otherOp.parsedSignature);
    return new Operator<I, V>({
      parsedSignature: newSignature,
      function: newFn,
    });
  }

  getFn(): Function {
    return this.fn;
  }

  getSignatureNode() {
    return this.parsedSignature.ast;
  }

  _setSignature(signature: ParsedSignature) {
    this.parsedSignature = signature;
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Operator)) return new iBoolean(false);
    return new iBoolean(this.fn.toString() == other.getFn().toString());
  }
}