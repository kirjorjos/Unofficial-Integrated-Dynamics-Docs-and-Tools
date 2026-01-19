import { Tag } from "./Tag";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Long } from "JavaNumberClasses/Long";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class LongArrayTag extends Tag<iArray<Long>> {
  protected data: iArray<Long>;

  constructor(data: iArray<Long>) {
    super();
    this.data = data;
  }

  getType(): number {
    return Tag.TAG_LONG_ARRAY;
  }

  static override valueOf(value: iArray<Long>): LongArrayTag {
    return new LongArrayTag(value);
  }

  override valueOf(): iArray<Long> {
    return this.data;
  }

  override getTypeAsString(): iString {
    return new iString("LongArrayTag");
  }

  equals(other: Tag<IntegratedValue>): iBoolean {
    if (other.getType() !== this.getType()) return new iBoolean(false);
    let otherArrayTag = other as LongArrayTag;
    return this.valueOf().equals(otherArrayTag.valueOf());
  }
}
