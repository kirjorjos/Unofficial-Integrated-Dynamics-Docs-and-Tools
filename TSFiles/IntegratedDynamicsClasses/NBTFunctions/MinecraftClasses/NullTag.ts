import { Tag } from "./Tag";

export class NullTag extends Tag<null> {

	constructor() {
		super();
	}
	
	override getType(): number {
		return Tag.TAG_NULL;
	}

	override valueOf(): null {
		return null;
	}

	override getTypeAsString(): string {
		return "NullTag";
	}

	override equals(tag: Tag<null>): boolean {
		return tag.getType() == Tag.TAG_NULL;
	}
	
}