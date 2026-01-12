import { iBoolean } from "./iBoolean";

export class iNull implements IntegratedValue {
  constructor() {}

  valueOf(): null {
    return null;
  }

  getSignatureNode(): TypeRawSignatureAST.RawSignatureDefiniteValue {
    return { type: "Null" };
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof iNull)) return new iBoolean(false);
    return new iBoolean(null === other.valueOf());
  }
}
