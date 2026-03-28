import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { ByteArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";
import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { LongArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongArrayTag";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";

import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

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
