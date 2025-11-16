import { Tag } from "./Tag";

export class ListTag extends Tag<IntegratedValue> {
	data: Tag<IntegratedValue>[];

	constructor(data: Tag<IntegratedValue>[]) {
		super();
		this.data = data;
	}
	
	getType(): number {
		return Tag.TAG_LIST;
	}
	
	static override valueOf(value: Tag<IntegratedValue>[]): ListTag {
		return new ListTag(value);
	}

	valueOf(): Tag<IntegratedValue>[] {
		return this.data;
	}

	size(): number {
		return this.data.length;
	}

	get(index: number): IntegratedValue {
		return this.data[index];
	}

	getArray(): Tag<IntegratedValue>[] {
		return [...this.data];
	}

	add(tag: Tag<IntegratedValue>) {
		this.data.push(tag);
	}

	override getTypeAsString(): string {
		return "ListTag";
	}

	equals(tag: Tag<IntegratedValue>): boolean {
		if (tag.getType() != Tag.TAG_LIST) return false;
		for (const [i, e] of Object.entries((tag as ListTag).getArray())) {
			if (!e.equals(this.get(parseInt(i)))) return false;
		}
		return true;
	}
}