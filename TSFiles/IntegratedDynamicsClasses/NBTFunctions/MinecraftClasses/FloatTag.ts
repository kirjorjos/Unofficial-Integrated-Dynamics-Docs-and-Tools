import { IntegratedValue } from "IntegratedDynamicsClasses/operators/Operator";
import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";

export class FloatTag extends NumericTag {
	protected data: Double;

	override getType(): number {
		return Tag.TAG_FLOAT;
	}

	constructor(data: Double) {
		super();
		this.data = data;
	}

	static override valueOf(value: Double): FloatTag {
		return new FloatTag(value);
	}

	override valueOf(): Double {
		return this.data;
	}

	getAsDouble(): number {
		return parseInt(this.data.toDecimal());
	}

	override getTypeAsString(): string {
		return "FloatTag";
	}

	equals(tag: Tag<IntegratedValue>): boolean {
		if (tag.getType() != Tag.TAG_FLOAT) return false;
		return this.getAsDouble() == (tag as FloatTag).getAsDouble();
	}
}
