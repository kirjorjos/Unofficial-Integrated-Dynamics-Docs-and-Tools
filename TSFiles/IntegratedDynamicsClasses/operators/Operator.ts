import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { ParsedSignature } from "../../HelperClasses/ParsedSignature";
import { TypeMap } from "../../HelperClasses/TypeMap";


export class Operator<I extends IntegratedValue, O extends IntegratedValue | Promise<IntegratedValue>> implements IntegratedValue {
  fn: (arg: I) => O;
  parsedSignature: ParsedSignature;
  typeMap: TypeMap;

  constructor({
    parsedSignature,
    function: fn
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
    if ("_setSignature" in newOp) (newOp._setSignature as Function)(parsedSignature);
    return newOp;
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
    return new iBoolean(this.fn.toString() == other.getFn().toString())
  }
}
