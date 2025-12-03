import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Tag } from "./Tag";

export class StringTag extends Tag<iString> {
  protected data: iString;

  constructor(data: iString) {
    super();
    this.data = data;
  }

  getType(): number {
    return Tag.TAG_STRING;
  }

  valueOf(): iString {
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
