import { Tag } from "./Tag";
import { NullTag } from "./NullTag";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "JavaNumberClasses/Integer";

export class ListTag extends Tag<IntegratedValue> {
  data: iArray<Tag<IntegratedValue>>;

  constructor(data: iArray<Tag<IntegratedValue>>) {
    super();
    this.data = data;
  }

  getType(): number {
    return Tag.TAG_LIST;
  }

  static override valueOf(value: iArray<Tag<IntegratedValue>>): ListTag {
    return new ListTag(value);
  }

  valueOf(): iArray<Tag<IntegratedValue>> {
    return this.data;
  }

  size(): Integer {
    return this.data.size();
  }

  get(index: Integer): Tag<IntegratedValue> {
    return this.data.get(index) ?? new NullTag();
  }

  getArray(): iArray<Tag<IntegratedValue>> {
    return new iArrayEager([...this.data.valueOf()]);
  }

  add(tag: Tag<IntegratedValue>) {
    this.data.append(tag);
  }

  override getTypeAsString(): iString {
    return new iString("ListTag");
  }

  equals(tag: Tag<IntegratedValue>): iBoolean {
    if (tag.getType() != Tag.TAG_LIST) return new iBoolean(false);
    for (const [i, e] of Object.entries((tag as ListTag).getArray())) {
      if (!e.equals(this.get(new Integer(i as TypeNumericString))))
        return new iBoolean(false);
    }
    return new iBoolean(true);
  }
}
