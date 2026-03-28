import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class iNull implements IntegratedValue {
  private _signatureCache: ParsedSignature | null = null;
  constructor() {}

  valueOf(): null {
    return null;
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "Null" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof iNull)) return new iBoolean(false);
    return new iBoolean(null === other.valueOf());
  }
}
