import { Tag } from "./Tag";
import { NullTag } from "./NullTag";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "JavaNumberClasses/Integer";
import { ByteArrayTag } from "./ByteArrayTag";
import { IntArrayTag } from "./IntArrayTag";
import { LongArrayTag } from "./LongArrayTag";
import { ByteTag } from "./ByteTag";
import { IntTag } from "./IntTag";
import { LongTag } from "./LongTag";

import { CompoundTag } from "./CompoundTag";

export class ListTag extends Tag<iArray<Tag<IntegratedValue>>> {
  data: iArray<Tag<IntegratedValue>>;

  constructor(data: iArray<Tag<IntegratedValue>>) {
    super();
    if (Array.isArray(data)) {
      this.data = new iArrayEager(data.map((v) => CompoundTag.wrap(v)));
    } else {
      this.data = data;
    }
  }

  static override valueOf(value: iArray<Tag<IntegratedValue>>): ListTag {
    return new ListTag(value);
  }

  getType(): number {
    return Tag.TAG_LIST;
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
    return new iString("LIST");
  }

  equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof Tag)) return new iBoolean(false);

    let otherList: ListTag;
    if (other instanceof ByteArrayTag) {
      const otherValue = other.valueOf().valueOf();
      otherList = new ListTag(
        new iArrayEager(otherValue.map((e: Integer) => new ByteTag(e)))
      );
    } else if (other instanceof IntArrayTag) {
      const otherValue = other.valueOf().valueOf();
      otherList = new ListTag(
        new iArrayEager(otherValue.map((e: Integer) => new IntTag(e)))
      );
    } else if (other instanceof LongArrayTag) {
      const otherValue = other.valueOf().valueOf();
      otherList = new ListTag(
        new iArrayEager(otherValue.map((e: Long) => new LongTag(e)))
      );
    } else if (other instanceof ListTag) {
      otherList = other;
    } else {
      return new iBoolean(false);
    }

    if (this.data.size().toJSNumber() !== otherList.data.size().toJSNumber()) {
      return new iBoolean(false);
    }
    const thisArray = this.data.valueOf();
    const otherArray = otherList.data.valueOf();
    for (let i = 0; i < thisArray.length; i++) {
      const thisItem = thisArray[i];
      const otherItem = otherArray[i];
      if (
        thisItem === undefined ||
        otherItem === undefined ||
        !thisItem.equals(otherItem).valueOf()
      ) {
        return new iBoolean(false);
      }
    }
    return new iBoolean(true);
  }

  toJSON(): jsonArray {
    return this.data.valueOf().map((tag) => tag.toJSON());
  }
}
