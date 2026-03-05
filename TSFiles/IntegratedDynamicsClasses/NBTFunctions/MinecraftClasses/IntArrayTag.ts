import { Tag } from "./Tag";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class IntArrayTag extends Tag<iArray<Integer>> {
  protected data: iArray<Integer>;

  constructor(data: iArray<Integer>) {
    super();
    this.data = data;
  }

  getType(): number {
    return Tag.TAG_INT_ARRAY;
  }

  static override valueOf(value: iArray<Integer>): IntArrayTag {
    return new IntArrayTag(value);
  }

  override valueOf(): iArray<Integer> {
    return this.data;
  }

  override getTypeAsString(): iString {
    return new iString("INT[]");
  }

  equals(other: Tag<IntegratedValue>): iBoolean {
    if (other.getType() !== this.getType()) return new iBoolean(false);
    let otherArrayTag = other as IntArrayTag;
    return this.valueOf().equals(otherArrayTag.valueOf());
  }

  toJSON(): jsonArray {
    return this.data.valueOf().map((v) => v.toJSNumber());
  }
}
