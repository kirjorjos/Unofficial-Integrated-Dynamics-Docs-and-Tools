import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";

export class ByteTag extends NumericTag {

	protected data: Integer;
	
	constructor(data: Integer) {
		super();
		this.data = data;
	}

	override getType(): number {
		return Tag.TAG_BYTE;
	}
	
	static override valueOf(value: Integer): ByteTag {
		return new ByteTag(value);
	}

	override valueOf(): Integer {
		return this.data;
	}

	getAsDouble(): number {
		return parseInt(this.data.toDecimal());
	}

	equals(tag: Tag<IntegratedValue>) {
		if (tag.getType() != Tag.TAG_BYTE) return false;
		return (this.valueOf() == tag.valueOf());
	}
}