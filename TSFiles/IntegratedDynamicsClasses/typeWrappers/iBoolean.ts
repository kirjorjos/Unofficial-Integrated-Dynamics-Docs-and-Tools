export class iBoolean {
	bool: boolean;

	constructor(bool: boolean) {
		this.bool = bool;
	}

	valueOf(): boolean {
		return this.bool;
	}
}