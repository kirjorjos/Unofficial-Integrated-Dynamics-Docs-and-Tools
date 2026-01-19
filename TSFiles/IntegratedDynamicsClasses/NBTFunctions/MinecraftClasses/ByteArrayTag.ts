import { Tag } from "./Tag";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class ByteArrayTag extends Tag<iArray<Integer>> {
  protected data: iArray<Integer>;

  constructor(data: iArray<Integer>) {
    super();
    this.data = data;
  }

  getType(): number {
    return Tag.TAG_BYTE_ARRAY;
  }

  static override valueOf(value: iArray<Integer>): ByteArrayTag {
    return new ByteArrayTag(value);
  }

  override valueOf(): iArray<Integer> {
    return this.data;
  }

  override getTypeAsString(): iString {
    return new iString("BYTE[]");
  }

  equals(other: Tag<IntegratedValue>): iBoolean {
    if (other.getType() !== this.getType()) return new iBoolean(false);
    let otherArrayTag = other as ByteArrayTag;
    return this.valueOf().equals(otherArrayTag.valueOf());
  }
}
