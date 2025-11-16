import { ListTag } from "./ListTag";
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

	get(key: string): Tag<IntegratedValue> {
		return this.data[key]!;
	}

	has(key: string): boolean {
		return key in this.data;
	}

	set(key: string, value: IntegratedValue) {
		let data = { ...this.data };
		data[key] = value;
		return new CompoundTag(data);
	}

	without(key: string): CompoundTag {
		let data = { ...this.data };
		delete data[key];
		return new CompoundTag(data);
	}

	getTypeAsString(): string {
		return "CompoundTag";
	}

	toJSON(): any {
			let obj = {} as any;

			function mapTagArray(value: Tag<any>) {
				(value as ListTag).getArray().map(e => {
					if (e instanceof CompoundTag) return e.toJSON();
					if (e instanceof ListTag) return mapTagArray(e);
					let innerValue = value.valueOf();
					while (innerValue instanceof Object && innerValue.constructor.name != "Object") {
						innerValue = innerValue.toJSON();
					}
				})
			};


			for (const [key, value] of Object.entries(this.data)) {
				if (!(value instanceof CompoundTag || value instanceof ListTag)) {
					let innerValue = value.valueOf();
					findBase: while (innerValue instanceof Object && innerValue.constructor.name != "Object") {
						if (!("toJSON" in innerValue)) break findBase;
						innerValue = (innerValue["toJSON"] as Function)();
					}
					obj[key] = innerValue;
				} else if (value instanceof CompoundTag) obj[key] = value.toJSON();
				else obj[key] = mapTagArray(value);
			}

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