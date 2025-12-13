import { iBoolean } from "./iBoolean";

export class iString implements IntegratedValue {
  str: string;

  constructor(str: string) {
    this.str = str;
  }

  valueOf(): string {
    return this.str;
  }

  getSignatureNode(): TypeRawSignatureAST.RawSignatureDefiniteValue {
		return { type: "String" };
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
