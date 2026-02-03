import { Integer } from "JavaNumberClasses/Integer";
import { ListTag } from "./ListTag";
import { Tag } from "./Tag";
import { IntTag } from "./IntTag";
import { ShortTag } from "./ShortTag";
import { FloatTag } from "./FloatTag";
import { ByteTag } from "./ByteTag";
import { Long } from "JavaNumberClasses/Long";
import { LongTag } from "./LongTag";
import { Double } from "JavaNumberClasses/Double";
import { DoubleTag } from "./DoubleTag";
import { NullTag } from "./NullTag";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { StringTag } from "./StringTag";

export class CompoundTag extends Tag<CompoundTag> {
  data: Record<string, Tag<IntegratedValue>>;

  constructor(data: Record<string, Tag<IntegratedValue>>) {
    super();
    this.data = data;
  }

  getType(): number {
    return Tag.TAG_COMPOUND;
  }

  static override valueOf(
    value: Record<string, Tag<IntegratedValue>>
  ): CompoundTag {
    return new CompoundTag(value);
  }

  valueOf(): CompoundTag {
    return this;
  }

  getAllKeys(): iArray<iString> {
    return new iArrayEager(Object.keys(this.data).map((e) => new iString(e)));
  }

  get(key: iString): Tag<IntegratedValue> {
    return this.data[key.valueOf()] ?? new NullTag();
  }

  has(key: iString): boolean {
    return key.valueOf() in this.data;
  }

  set(key: string, value: Tag<IntegratedValue>) {
    let data = { ...this.data };
    data[key] = value;
    return new CompoundTag(data);
  }

  setAll(keys: iString[], values: Tag<IntegratedValue>[]): CompoundTag {
    if (keys.length != values.length)
      throw new Error(
        `Keys (length ${keys.length}) is not the same as values (${values.length})`
      );
    let data = { ...this.data };
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i] as iString;
      let value = values[i] as Tag<IntegratedValue>;
      data[key.valueOf()] = value;
    }
    return new CompoundTag(data);
  }

  without(key: string): CompoundTag {
    let data = { ...this.data };
    delete data[key];
    return new CompoundTag(data);
  }

  getTypeAsString(): iString {
    return new iString("COMPOUND");
  }

  toJSON(): jsonObject {
    let obj: jsonObject = {};

    for (const [key, value] of Object.entries(this.data)) {
      if (value instanceof CompoundTag) {
        obj[key] = value.toJSON();
      } else if (value instanceof ListTag) {
        obj[key] = (value as ListTag)
          .valueOf()
          .valueOf()
          .map((e: Tag<IntegratedValue>) => {
            if ("toJSON" in e && typeof (e as any).toJSON === "function") {
              return (e as any).toJSON();
            }
            return e.valueOf();
          });
      } else if (
        "toJSON" in value &&
        typeof (value as any).toJSON === "function"
      ) {
        obj[key] = (value as any).toJSON();
      } else {
        const val = value.valueOf();
        if (typeof val === "object" && val !== null && "toJSNumber" in val) {
          obj[key] = (val as any).toJSNumber();
        } else if (
          typeof val === "object" &&
          val !== null &&
          "valueOf" in val
        ) {
          obj[key] = (val as any).valueOf();
        } else {
          obj[key] = val as any;
        }
      }
    }
    return obj;
  }

  static fromJSON(data: string): CompoundTag {
    const jsonStr = data
      .replace(/([{,]\s*)([A-Za-z_]+)(\s*:)/g, '$1"$2"$3') //quote keys
      .replace(
        /(:\s*)([A-Za-z0-9_]*[A-Za-z][A-Za-z0-9_]*)(?=\s*[,}])/g,
        '$1"$2"'
      ) //quote many values
      .replace(
        /\[(?<type>[BIL]);(?<values>-?\d+[bl]?(?:,-?\d+[bl]?)*?)\]/g,
        (_, type, values) => {
          const arr = values.split(",");
          return JSON.stringify({ type, values: arr });
        }
      );

    const json = JSON.parse(jsonStr);

    function objectCase(obj: { [k: string]: any }): CompoundTag {
      const newObj: Record<string, Tag<IntegratedValue>> = {};
      for (const key of Object.keys(obj)) {
        if (Array.isArray(obj[key]))
          newObj[key] = new ListTag(new iArrayEager(arrayCase(obj[key])));
        else if (obj[key] instanceof Object) newObj[key] = objectCase(obj[key]);
        else newObj[key] = baseCase(obj[key]);
      }
      return new CompoundTag(newObj);
    }

    function baseCase(value: any): Tag<IntegratedValue> {
      switch (typeof value) {
        case "number":
          if (Number.isInteger(value)) {
            if (value >= -2147483648 && value <= 2147483647) {
              return new IntTag(new Integer(value));
            } else {
              return new LongTag(new Long(value));
            }
          } else {
            return new DoubleTag(new Double(value));
          }
        case "boolean":
          return new ByteTag(new Integer(+value));
        case "string":
          const str = value as string;
          if (str.match(/^-?\d+b$/i)) {
            return new ByteTag(new Integer(parseInt(str.slice(0, -1))));
          } else if (str.match(/^-?\d+s$/i)) {
            return new ShortTag(new Integer(parseInt(str.slice(0, -1))));
          } else if (str.match(/^-?\d+l$/i)) {
            return new LongTag(new Long(parseInt(str.slice(0, -1))));
          } else if (str.match(/^-?\d+(\.\d+)?[fF]$/)) {
            return new FloatTag(new Double(parseFloat(str.slice(0, -1))));
          } else if (str.match(/^-?\d+(\.\d+)?[dD]$/)) {
            return new DoubleTag(new Double(parseFloat(str.slice(0, -1))));
          } else if (str.match(/^-?\d+(\.\d+)?$/)) {
            return new StringTag(new iString(str));
          }
          return new StringTag(new iString(str));
        default:
          throw new Error(`Unknown type for NBT baseCase: ${typeof value}`);
      }
    }

    function arrayCase(arr: any[]): Tag<IntegratedValue>[] {
      const newArr: Tag<IntegratedValue>[] = [];
      for (const v of arr) {
        if (Array.isArray(v))
          newArr.push(new ListTag(new iArrayEager(arrayCase(v))));
        else if (v instanceof Object) newArr.push(objectCase(v));
        else newArr.push(baseCase(v));
      }
      return newArr;
    }

    return objectCase(json);
  }

  compoundSubset(subset: CompoundTag): boolean {
    for (const key of subset.getAllKeys().valueOf()) {
      const subValue = subset.get(key);
      const superValue = this.get(key);

      if (superValue instanceof NullTag) return false;

      if (
        subValue instanceof CompoundTag &&
        superValue instanceof CompoundTag
      ) {
        if (!superValue.compoundSubset(subValue)) return false;
      } else if (
        subValue.getType() === Tag.TAG_LIST &&
        superValue.getType() === Tag.TAG_LIST
      ) {
        let subValueArr = (subValue as ListTag).valueOf();
        let superValueArr = (superValue as ListTag).valueOf();
        if (!subValueArr.size().equals(superValueArr.size())) return false;
        if (
          subValueArr.every((v, i) =>
            superValueArr.get(new Integer(i))?.equals(v)
          )
        )
          return true;
        return false;
      }
    }
    return true;
  }

  public compoundUnion(other: CompoundTag): CompoundTag {
    const keys: iString[] = [];
    const values: any[] = [];

    for (const key of other.getAllKeys().valueOf()) {
      const thisValue = this.get(key);
      const otherValue = other.get(key);

      if (
        thisValue instanceof CompoundTag &&
        otherValue instanceof CompoundTag
      ) {
        keys.push(key);
        values.push(thisValue.compoundUnion(otherValue));
      } else {
        keys.push(key);
        values.push(otherValue);
      }
    }

    return this.setAll(keys, values);
  }

  public compoundIntersection(other: CompoundTag): CompoundTag {
    const result: Record<string, Tag<IntegratedValue>> = {};

    for (const key of this.getAllKeys().valueOf()) {
      if (other.has(key)) {
        const thisValue = this.get(key)!;
        const otherValue = other.get(key)!;

        if (
          thisValue instanceof CompoundTag &&
          otherValue instanceof CompoundTag
        ) {
          const sub = thisValue.compoundIntersection(otherValue);
          if (sub.getAllKeys().size().gt(Integer.ZERO))
            result[key.valueOf()] = sub;
        } else if (
          thisValue instanceof ListTag &&
          otherValue instanceof ListTag
        ) {
          const thisList = thisValue.valueOf();
          const otherList = otherValue.valueOf();
          const intersection = thisList.filter((e) => otherList.includes(e));
          result[key.valueOf()] = new ListTag(intersection);
        } else if (thisValue.equals(otherValue).valueOf()) {
          result[key.valueOf()] = thisValue;
        }
      }
    }

    return new CompoundTag(result);
  }

  public compoundMinus(other: CompoundTag): CompoundTag {
    const result: Record<string, any> = {};

    for (const key of this.getAllKeys().valueOf()) {
      const thisValue = this.get(key)!;

      if (!other.has(key)) {
        result[key.valueOf()] = thisValue;
        continue;
      }

      const otherValue = other.get(key);

      if (
        thisValue instanceof CompoundTag &&
        otherValue instanceof CompoundTag
      ) {
        const sub = thisValue.compoundMinus(otherValue);
        if (sub.getAllKeys().size().gt(Integer.ZERO))
          result[key.valueOf()] = sub;
      } else if (
        thisValue instanceof ListTag &&
        otherValue instanceof ListTag
      ) {
        const thisList = thisValue.valueOf();
        const otherList = otherValue.valueOf();
        const difference = thisList.filter((e) => !otherList.includes(e));
        if (difference.size().gt(Integer.ZERO)) {
          result[key.valueOf()] = new ListTag(difference);
        }
      } else if (!thisValue.equals(otherValue).valueOf()) {
        result[key.valueOf()] = thisValue;
      }
    }

    return new CompoundTag(result);
  }

  equals(other: Tag<IntegratedValue>): iBoolean {
    if (other.getType() !== Tag.TAG_COMPOUND) return new iBoolean(false);
    let otherCompound = other as CompoundTag;

    const thisKeys = this.getAllKeys()
      .valueOf()
      .map((k) => k.valueOf());
    const otherKeys = otherCompound
      .getAllKeys()
      .valueOf()
      .map((k) => k.valueOf());

    if (thisKeys.length !== otherKeys.length) return new iBoolean(false);

    for (const keyString of thisKeys) {
      const key = new iString(keyString);
      const thisValue = this.get(key);
      const otherValue = otherCompound.get(key);

      if (
        thisValue === undefined ||
        otherValue === undefined ||
        !thisValue.equals(otherValue).valueOf()
      ) {
        return new iBoolean(false);
      }
    }
    return new iBoolean(true);
  }
}
