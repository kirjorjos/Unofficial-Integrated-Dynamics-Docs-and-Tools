export class NBT {
	
	data: { [k: string]: NBT } | { value: string | number | boolean, type: string };

	constructor(data: any) {
		this.data = this.parseJSON(data);
	}

	private parseJSON(data: any): { [k: string | number]: NBT } | { value: string | number | boolean, type: string } {
		if (Array.isArray(data)) {
			let returnValue = new Array<NBT>();
			for (let i = 0; i < data.length; i++) {
				returnValue[i] = new NBT(data[i]);
			}
			return returnValue as { [k: number]: NBT };
		}
		if (typeof data === "object") {
			let resultObj = {} as { [k: string]: NBT };
			for (const [key, value] of Object.entries(data)) {
				resultObj[key] = new NBT(value);
			}
			return resultObj;
		}
		if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
			return {
				value: data,
				type: typeof data
			}
		}
		return data;
	}

	toJSON(): any {
		let resultObj: Record<string, NBT> = {};
		for (const [key, value] of Object.entries(this.data)) {
			if (value instanceof NBT) resultObj[key] = value.toJSON();
			else resultObj[key] = value;
		}
	}

	public compoundSubset(subset: NBT): boolean {
		for (const key of subset.getKeys()) {
			const subValue = subset.getValue(key);
			const superValue = this.getValue(key);

			if (superValue === undefined) return false;

			if (subValue instanceof NBT && superValue instanceof NBT) {
				if (!superValue.compoundSubset(subValue)) return false;
			}
			else if (subValue instanceof Object && superValue instanceof Object && !superValue.equals(subValue)) {
				return false;
			}
			else if (!(subValue instanceof Object) && subValue !== superValue) {
				return false;
			}
		}
		return true;
	}

	public compoundUnion(other: NBT): NBT {
		const keys: string[] = [];
		const values: any[] = [];

		for (const key of other.getKeys()) {
			const thisValue = this.getValue(key);
			const otherValue = other.getValue(key);

			if (thisValue instanceof NBT && otherValue instanceof NBT) {
				keys.push(key);
				values.push(thisValue.compoundUnion(otherValue));
			}
			else {
				keys.push(key);
				values.push(otherValue);
			}
		}

		return this.setValues(keys, values);
	}

	public compoundIntersection(other: NBT): NBT {
		const result: Record<string, NBT> = {};

		for (const key of this.getKeys()) {
			const thisValue = this.getValue(key);
			const otherValue = other.getValue(key);

			if (otherValue === undefined) continue;

			if (thisValue instanceof NBT && otherValue instanceof NBT) {
			const sub = thisValue.compoundIntersection(otherValue);
			if (sub.getKeys().length > 0) result[key] = sub;
			}
			else if (thisValue instanceof Object && otherValue instanceof Object && thisValue.equals(otherValue)) {
			result[key] = thisValue;
			}
			else if (!(thisValue instanceof Object) && thisValue === otherValue) {
				result[key] = thisValue;
			}
		}

		return new NBT(result);
	}

	public compoundMinus(other: NBT): NBT {
		const result: Record<string, any> = {};

		for (const key of this.getKeys()) {
			const thisValue = this.getValue(key);
			const otherValue = other.getValue(key);

			if (otherValue === undefined) {
				result[key] = thisValue;
				continue;
			}

			if (thisValue instanceof NBT && otherValue instanceof NBT) {
				const sub = thisValue.compoundMinus(otherValue);
				if (sub.getKeys().length > 0) result[key] = sub;
			}
			else if (thisValue instanceof Object && otherValue instanceof Object && !thisValue.equals(otherValue)) {
				result[key] = thisValue;
			}
			else if (!(thisValue instanceof Object) && thisValue !== otherValue) {
				result[key] = thisValue;
			}
		}

		return new NBT(result);
	}

}