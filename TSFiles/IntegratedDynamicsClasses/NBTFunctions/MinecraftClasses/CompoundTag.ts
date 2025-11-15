import { Tag } from "./Tag";

export class CompoundTag extends Tag<IntegratedValue> {
	data: Record<string, Tag<IntegratedValue>>;

	constructor(data: Record<string, Tag<IntegratedValue>>) {
		super();
		this.data = data;
	}
	
	getType(): number {
		return Tag.TAG_COMPOUND;
	}
	
	static override valueOf(value: Record<string, Tag<IntegratedValue>>): CompoundTag {
		return new CompoundTag(value);
	}

	valueOf(): Record<string, Tag<IntegratedValue>> {
		return this.data;
	}

	getAllKeys(): string[] {
		return Object.keys(this.data);
	}

	get(key: string): IntegratedValue {
		return this.data[key];
	}

	equals(tag: Tag<IntegratedValue>): boolean {
		if (tag.getType() != Tag.TAG_COMPOUND) return false;
		let compoundTag = tag as CompoundTag;
		for (const key of Object.values(new Set([...this.getAllKeys(), ...compoundTag.getAllKeys()]))) {
			if (this.get(key) !== compoundTag.get(key)) return false;
		}
		return true;
	}
}