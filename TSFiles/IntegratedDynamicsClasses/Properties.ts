export class Properties {
	data: Record<string, any>;

	constructor(data: Record<string, any>) {
		this.data = data;
	}

	has(key: string): boolean {
		return key in this.data;
	}

	set(key: string, value: any) {
		this.data[key] = value;
	}

	setAll(newData: Properties) {
		for (const [k, v] of newData.getItterator()) {
			this.data[k] = v;
		}
	}

	getItterator(): [string, any][] {
		return Object.entries(this.data);
	}

	get(key: string) {
		return this.data[key];
	}
}