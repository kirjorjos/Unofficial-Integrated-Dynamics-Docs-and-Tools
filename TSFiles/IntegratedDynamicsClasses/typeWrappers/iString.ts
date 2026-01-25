import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "./iBoolean";

export class iString implements IntegratedValue {
  private _signatureCache: ParsedSignature | null = null;
  str: string;

  constructor(str: string) {
    this.str = str;
  }

  valueOf(): string {
    return this.str;
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "String" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof iString)) return new iBoolean(false);
    return new iBoolean(this.str == other.valueOf());
  }

  add(other: String) {
    return new iString(this.str + other);
  }

  length() {
    return this.str.length;
  }
}
