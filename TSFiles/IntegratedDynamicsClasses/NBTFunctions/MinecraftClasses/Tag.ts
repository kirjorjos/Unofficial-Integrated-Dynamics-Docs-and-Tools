import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export abstract class Tag<T extends IntegratedValue>
  implements IntegratedValue
{
  static TAG_LIST = 0;
  static TAG_COMPOUND = 1;
  static TAG_STRING = 2;
  static TAG_NUMERIC = 3;
  static TAG_BYTE = 4;
  static TAG_DOUBLE = 5;
  static TAG_NULL = 6;
  static TAG_INT = 7;
  static TAG_LONG = 7;
  static TAG_FLOAT = 8;
  static TAG_Short = 9;

  protected constructor() {}

  abstract getType(): number;

  abstract valueOf(): T | Record<string, Tag<T>> | Tag<T>[];

  abstract equals(tag: IntegratedValue): iBoolean;

  abstract getTypeAsString(): iString;

  getSignatureNode(): TypeRawSignatureAST.RawSignatureNode {
    return {
      type: "NBT",
    };
  }
}
