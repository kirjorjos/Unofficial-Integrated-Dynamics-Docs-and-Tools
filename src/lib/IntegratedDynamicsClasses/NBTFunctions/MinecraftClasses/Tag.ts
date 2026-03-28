import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Named } from "lib/IntegratedDynamicsClasses/Named";

export abstract class Tag<T extends IntegratedValue>
  implements IntegratedValue, Named
{
  private _signatureCache: ParsedSignature | null = null;
  static TAG_END = 0;
  static TAG_BYTE = 1;
  static TAG_SHORT = 2;
  static TAG_INT = 3;
  static TAG_LONG = 4;
  static TAG_FLOAT = 5;
  static TAG_DOUBLE = 6;
  static TAG_BYTE_ARRAY = 7;
  static TAG_STRING = 8;
  static TAG_LIST = 9;
  static TAG_COMPOUND = 10;
  static TAG_INT_ARRAY = 11;
  static TAG_LONG_ARRAY = 12;

  static TAG_NUMERIC = 99;
  static TAG_NULL = -1;

  protected constructor() {}

  abstract getType(): number;

  abstract valueOf(): T;

  abstract equals(tag: IntegratedValue): iBoolean;

  abstract getTypeAsString(): iString;

  abstract toJSON(): jsonData;

  getName(): iString {
    return new iString(JSON.stringify(this.toJSON()));
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "NBT" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }
}
