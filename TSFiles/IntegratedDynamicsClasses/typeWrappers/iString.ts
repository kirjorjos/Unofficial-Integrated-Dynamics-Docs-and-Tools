import { IntegratedValue } from "IntegratedDynamicsClasses/operators/Operator";

export class iString {
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
    if (!(other instanceof iString)) return false;
    return (this.str == other.valueOf());
  }

}
