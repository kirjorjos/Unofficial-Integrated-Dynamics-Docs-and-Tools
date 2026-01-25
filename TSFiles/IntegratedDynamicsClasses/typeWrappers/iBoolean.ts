import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class iBoolean implements IntegratedValue {
  private _signatureCache: ParsedSignature | null = null;
  bool: boolean;

  constructor(bool: boolean) {
    this.bool = bool;
  }

  valueOf(): boolean {
    return this.bool;
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "Boolean" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof iBoolean)) return new iBoolean(false);
    return new iBoolean(this.bool == other.valueOf());
  }
}
