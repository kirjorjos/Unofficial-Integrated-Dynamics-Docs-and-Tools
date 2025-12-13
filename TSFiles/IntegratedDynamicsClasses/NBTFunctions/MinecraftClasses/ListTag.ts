import { Tag } from "./Tag";
import { NullTag } from "./NullTag";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class ListTag extends Tag<IntegratedValue> {
  data: Tag<IntegratedValue>[];

  constructor(data: Tag<IntegratedValue>[]) {
    super();
    this.data = data;
  }

  getType(): number {
    return Tag.TAG_LIST;
  }

  static override valueOf(value: Tag<IntegratedValue>[]): ListTag {
    return new ListTag(value);
  }

  valueOf(): Tag<IntegratedValue>[] {
    return this.data;
  }

  size(): number {
    return this.data.length;
  }

  get(index: number): Tag<IntegratedValue> {
    return this.data[index] ?? new NullTag;
  }

  getArray(): Tag<IntegratedValue>[] {
    return [...this.data];
  }

  add(tag: Tag<IntegratedValue>) {
    this.data.push(tag);
  }

  override getTypeAsString(): iString {
    return new iString("ListTag");
  }

  equals(tag: Tag<IntegratedValue>): iBoolean {
    if (tag.getType() != Tag.TAG_LIST) return new iBoolean(false);
    for (const [i, e] of Object.entries((tag as ListTag).getArray())) {
      if (!e.equals(this.get(parseInt(i)))) return new iBoolean(false);
    }
    return new iBoolean(true);
  }
}
