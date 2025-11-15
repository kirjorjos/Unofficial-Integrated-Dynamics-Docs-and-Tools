import { Tag } from "./Tag";

export abstract class StringTag extends Tag<string> {

    protected data: string;
	
	constructor(data: string) {
		super();
		this.data = data;
	}

    getType(): number {
        return Tag.TAG_STRING;
    }

    getAsString(): string {
        return this.data;
    }
    
}