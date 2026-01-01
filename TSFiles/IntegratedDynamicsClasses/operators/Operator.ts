import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { ParsedSignature } from "../../HelperClasses/ParsedSignature";
import { TypeMap } from "../../HelperClasses/TypeMap";

export class Operator<I extends IntegratedValue, O extends IntegratedValue>
  implements IntegratedValue
{
  fn: (arg: I) => O;
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
    this.typeMap = new TypeMap(parsedSignature.getAST());
    this.parsedSignature = parsedSignature;
  }

  apply(arg: I): O {
    const parsedSignature = this.parsedSignature.apply(arg.getSignatureNode());

    let newOp = this.fn(arg);
    if ("_setSignature" in newOp)
      (newOp._setSignature as Function)(parsedSignature);
    return newOp;
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

  getFn(): TypeLambda<I, O> {
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
