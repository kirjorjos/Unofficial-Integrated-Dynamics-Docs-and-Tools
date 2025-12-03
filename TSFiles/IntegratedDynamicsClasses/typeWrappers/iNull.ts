import { IntegratedValue } from "IntegratedDynamicsClasses/operators/Operator";

export class iNull {

	constructor() {}

	valueOf(): null {
		return null;
	}

	getSignatureNode(): TypeRawSignatureAST.RawSignatureDefiniteValue {
		return { type: "Null" };
	}

	equals(other: IntegratedValue) {
		if (!(other instanceof iNull)) return false;
		return (null === other.valueOf());
	}
	
}
