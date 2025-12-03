import { IntegratedValue } from "IntegratedDynamicsClasses/operators/Operator";
import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";

export class ShortTag extends NumericTag {
	protected data: Integer;

	constructor(data: Integer) {
		super();
		this.data = data;
	}

	override getType(): number {
		return Tag.TAG_Short;
	}

	static override valueOf(value: Integer): ShortTag {
		return new ShortTag(value);
	}

	override valueOf(): Integer {
		return this.data;
	}

	getAsDouble(): number {
		return parseInt(this.data.toDecimal());
	}

	override getTypeAsString(): string {
		return "ShortTag";
	}

	equals(tag: Tag<IntegratedValue>) {
		if (tag.getType() != Tag.TAG_Short) return false;
		return this.valueOf() == tag.valueOf();
	}
}
