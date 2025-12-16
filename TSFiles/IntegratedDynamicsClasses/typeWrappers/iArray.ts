import { iBoolean } from "./iBoolean";

export class iArray<T extends IntegratedValue> implements IntegratedValue {
  arr: Array<T>;

  constructor(arr: Array<T>) {
    this.arr = arr;
  }

  valueOf(): Array<T> {
    return this.arr;
  }

  getSignatureNode(): TypeRawSignatureAST.RawSignatureDefiniteValue {
    return { type: "Boolean" };
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof iArray)) return new iBoolean(false);
    return new iBoolean(this.arr == other.valueOf());
  }
}
