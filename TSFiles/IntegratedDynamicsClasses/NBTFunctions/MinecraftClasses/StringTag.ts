import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Tag } from "./Tag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

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

  getTypeAsString(): iString {
    return new iString("StringTag");
  }

  equals(other: Tag<any>): iBoolean {
    if (other.getType() != Tag.TAG_STRING) return new iBoolean(false);
    return new iBoolean(this.data == other.valueOf());
  }
}
