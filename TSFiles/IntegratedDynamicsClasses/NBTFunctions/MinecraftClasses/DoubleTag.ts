import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";

export class DoubleTag extends NumericTag {

	protected data: Double;
	
	override getType(): number {
		return Tag.TAG_DOUBLE;
	}

	constructor(data: Double) {
		super();
		this.data = data;
	}

	static override valueOf(value: Double): DoubleTag {
		return new DoubleTag(value);
	}

	override valueOf(): Double {
		return this.data;
	}

	getAsDouble(): number {
		return parseInt(this.data.toDecimal());
	}

	override getTypeAsString(): string {
		return "DoubleTag";
	}

	equals(tag: Tag<IntegratedValue>): boolean {
		if (tag.getType() != Tag.TAG_DOUBLE) return false;
		return this.getAsDouble() == (tag as DoubleTag).getAsDouble();
	}
}