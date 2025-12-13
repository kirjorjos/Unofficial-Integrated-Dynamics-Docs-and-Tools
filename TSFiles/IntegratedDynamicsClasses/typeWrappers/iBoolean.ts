export class iBoolean implements IntegratedValue {
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
    if (!(other instanceof iBoolean)) return new iBoolean(false);
    return new iBoolean(this.bool == other.valueOf());
  }
  
}
