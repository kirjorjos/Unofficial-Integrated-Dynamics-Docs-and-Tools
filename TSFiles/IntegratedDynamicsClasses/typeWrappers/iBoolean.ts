import { IntegratedValue } from "IntegratedDynamicsClasses/operators/Operator";

export class iBoolean {
  bool: boolean;

  constructor(bool: boolean) {
    this.bool = bool;
  }

  valueOf(): boolean {
    return this.bool;
  }

  getSignatureNode(): TypeRawSignatureAST.RawSignatureDefiniteValue {
		return { type: "Boolean" };
	}

  equals(other: IntegratedValue) {
    if (!(other instanceof iBoolean)) return false;
    return (this.bool == other.valueOf());
  }
  
}
