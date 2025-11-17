import { Tag } from "./Tag";

export class StringTag extends Tag<string> {
  protected data: string;

  constructor(data: string) {
    super();
    this.data = data;
  }

  getType(): number {
    return Tag.TAG_STRING;
  }

  valueOf(): string {
    return this.data;
  }

  getTypeAsString(): string {
    return "StringTag";
  }

  equals(other: Tag<any>): boolean {
    if (other.getType() != Tag.TAG_STRING) return false;
    return this.data == other.valueOf();
  }
}
