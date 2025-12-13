import { Integer } from "JavaNumberClasses/Integer";
import { ListTag } from "./ListTag";
import { Tag } from "./Tag";
import { IntTag } from "./IntTag";
import { ByteTag } from "./ByteTag";
import { Long } from "JavaNumberClasses/Long";
import { LongTag } from "./LongTag";
import { Double } from "JavaNumberClasses/Double";
import { DoubleTag } from "./DoubleTag";
import { NullTag } from "./NullTag";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class CompoundTag extends Tag<IntegratedValue> {
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

  valueOf(): Record<string, Tag<IntegratedValue>> {
    return this.data;
  }

  getAllKeys(): iString[] {
    return Object.keys(this.data).map(e => new iString(e));
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
    return new iString("CompoundTag");
  }

  toJSON(): any {
    let obj = {} as any;

    function mapTagArray(value: Tag<any>) {
      (value as ListTag).getArray().map((e) => {
        if (e instanceof CompoundTag) return e.toJSON();
        if (e instanceof ListTag) return mapTagArray(e);
        let innerValue = value.valueOf();
        while (
          innerValue instanceof Object &&
          innerValue.constructor.name != "Object"
        ) {
          innerValue = innerValue.toJSON();
        }
      });
    }

    for (const [key, value] of Object.entries(this.data)) {
      if (!(value instanceof CompoundTag || value instanceof ListTag)) {
        let innerValue = value.valueOf() as IntegratedValue;
        findBase: while (
          innerValue instanceof Object &&
          innerValue.constructor.name != "Object"
        ) {
          if (!("toJSON" in innerValue)) break findBase;
          innerValue = ((innerValue)["toJSON"] as Function)();
        }
        obj[key] = innerValue;
      } else if (value instanceof CompoundTag) obj[key] = value.toJSON();
      else obj[key] = mapTagArray(value);
    }
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
      for (const key of Object.keys(obj)) {
        if (Array.isArray(obj[key])) obj[key] = arrayCase(obj[key]);
        if (obj[key] instanceof Object) obj[key] = objectCase(obj[key]);
        else obj[key] = baseCase(obj[key]);
      }
      return new CompoundTag(obj);
    }

    function baseCase(obj: { [k: string]: any }): CompoundTag {
      for (const key of Object.keys(obj)) {
        switch (typeof obj[key]) {
          case "number":
            obj[key] = new IntTag(new Integer(obj[key]));
            break;
          case "boolean":
            obj[key] = new ByteTag(new Integer(+obj[key]));
            break;
          case "string":
            const str = obj[key] as string;
            if (str.match(/\d*[Bb]/))
              obj[key] = new ByteTag(new Integer(parseInt(str.slice(0, -1))));
            if (str.match(/\d*[Ss]/))
              obj[key] = new IntTag(new Integer(parseInt(str.slice(0, -1))));
            else if (str.match(/\d*[Ll]/))
              obj[key] = new LongTag(new Long(parseInt(str.slice(0, -1))));
            else if (str.match(/\d*[FfDd]/))
              obj[key] = new DoubleTag(new Double(parseInt(str.slice(0, -1))));
            else if (str.match(/d{1,}/))
              obj[key] = new IntTag(new Integer(parseInt(obj[key])));
            break;
          default:
            throw new Error(`Unknown type: ${typeof obj[key]}`);
        }
      }
      return new CompoundTag(obj);
    }

    function arrayCase(arr: any[]): Tag<any>[] {
      for (const [k, v] of Object.entries(arr)) {
        const i = parseInt(k);
        if (Array.isArray(v)) arr[i] = new ListTag(arrayCase(v));
        else if (v instanceof Object) arr[i] = objectCase(v);
        else arr[i] = baseCase(v);
      }
      return arr;
    }

    return objectCase(json);
  }

  compoundSubset(subset: CompoundTag): boolean {
    for (const key of subset.getAllKeys()) {
      const subValue = subset.get(key);
      const superValue = this.get(key);

      if (superValue === undefined) return false;

      if (
        subValue instanceof CompoundTag &&
        superValue instanceof CompoundTag
      ) {
        if (!superValue.compoundSubset(subValue)) return false;
      } else if (subValue instanceof ListTag && superValue instanceof ListTag) {
        let subValueArr = subValue.valueOf();
        let superValueArr = superValue.valueOf();
        if (subValueArr.length !== superValueArr.length) return false;
        if (subValueArr.every((v, i) => superValueArr[i]?.equals(v)))
          return true;
        return false;
      }
    }
    return true;
  }

  public compoundUnion(other: CompoundTag): CompoundTag {
    const keys: iString[] = [];
    const values: any[] = [];

    for (const key of other.getAllKeys()) {
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

    for (const key of this.getAllKeys()) {
      const thisValue = this.get(key)!;
      const otherValue = other.get(key);

      if (
        thisValue instanceof CompoundTag &&
        otherValue instanceof CompoundTag
      ) {
        const sub = thisValue.compoundIntersection(otherValue);
        if (sub.getAllKeys().length > 0) result[key.valueOf()] = sub;
      } else if (thisValue.equals(otherValue ?? new CompoundTag({}))) {
        result[key.valueOf()] = thisValue;
      }
    }

    return new CompoundTag(result);
  }

  public compoundMinus(other: CompoundTag): CompoundTag {
    const result: Record<string, any> = {};

    for (const key of this.getAllKeys()) {
      const thisValue = this.get(key)!;
      const otherValue = other.get(key);

      if (
        thisValue instanceof CompoundTag &&
        otherValue instanceof CompoundTag
      ) {
        const sub = thisValue.compoundMinus(otherValue);
        if (sub.getAllKeys().length > 0) result[key.valueOf()] = sub;
      } else if (!thisValue.equals(otherValue ?? new CompoundTag({}))) {
        result[key.valueOf()] = thisValue;
      }
    }

    return new CompoundTag(result);
  }

  equals(tag: Tag<IntegratedValue>): iBoolean {
    if (tag.getType() != Tag.TAG_COMPOUND) return new iBoolean(false);
    let compoundTag = tag as CompoundTag;
    for (const key of Object.values(
      new Set([...this.getAllKeys(), ...compoundTag.getAllKeys()])
    )) {
      if (this.get(key) !== compoundTag.get(key)) return new iBoolean(false);
    }
    return new iBoolean(true);
  }
}
