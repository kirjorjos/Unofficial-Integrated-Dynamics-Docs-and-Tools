import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

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
    return new iString("STRING");
  }

  equals(other: Tag<any>): iBoolean {
    if (other.getType() != Tag.TAG_STRING) return new iBoolean(false);
    return this.data.equals(other.valueOf());
  }

  toJSON(): string {
    return this.data.valueOf();
  }
}
