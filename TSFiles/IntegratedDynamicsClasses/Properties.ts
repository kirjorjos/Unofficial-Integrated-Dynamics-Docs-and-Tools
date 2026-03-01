import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";
import { Integer } from "JavaNumberClasses/Integer";
import { Double } from "JavaNumberClasses/Double";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iString } from "./typeWrappers/iString";
import { iArrayEager } from "./typeWrappers/iArrayEager";
import { iNull } from "./typeWrappers/iNull";
import { Tag } from "./NBTFunctions/MinecraftClasses/Tag";

import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class Properties implements IntegratedValue {
  data: Record<string, any>;
  private _signatureCache: any;

  constructor(data: Record<string, any>) {
    this.data = {};
    for (const [k, v] of Object.entries(data)) {
      this.set(k, v);
    }
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) return this._signatureCache;
    this._signatureCache = new ParsedSignature(
      { type: "Any", typeID: -1 },
      false
    );
    return this._signatureCache;
  }

  equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof Properties)) return new iBoolean(false);
    const thisKeys = Object.keys(this.data);
    const otherKeys = Object.keys(other.data);
    if (thisKeys.length !== otherKeys.length) return new iBoolean(false);

    for (const key of thisKeys) {
      if (!other.has(key)) return new iBoolean(false);
      const valA = this.get(key);
      const valB = other.get(key);
      if (!valA.equals(valB).valueOf()) return new iBoolean(false);
    }
    return new iBoolean(true);
  }

  static wrapValue(val: any): any {
    if (val === null || val === undefined) return new iNull();
    if (typeof val === "object" && val !== null && "getSignatureNode" in val)
      return val;

    if (typeof val === "boolean") return new iBoolean(val);
    if (typeof val === "string") return new iString(val);
    if (typeof val === "number") {
      if (Number.isInteger(val)) return new Integer(val);
      return new Double(val);
    }
    if (Array.isArray(val)) {
      return new iArrayEager(val.map((v: any) => Properties.wrapValue(v)));
    }

    if (typeof val === "object" && val !== null) {
      return new CompoundTag(val);
    }

    throw new Error(
      `Unsupported value type in Properties: ${typeof val} (value: ${JSON.stringify(val)})`
    );
  }

  has(key: string): boolean {
    return key in this.data;
  }

  set(key: string, value: any) {
    this.data[key] = Properties.wrapValue(value);
  }

  setAll(newData: Properties) {
    for (const [k, v] of newData.getItterator()) {
      if (k === "NBT") {
        const baseNbt = this.data["NBT"];
        if (
          baseNbt?.getType?.() === Tag.TAG_COMPOUND &&
          v?.getType?.() === Tag.TAG_COMPOUND
        ) {
          this.data["NBT"] = (baseNbt as CompoundTag).compoundUnion(
            v as CompoundTag
          );
          continue;
        }
        this.data[k] = v;
        continue;
      }

      this.data[k] = v;
    }
  }

  getItterator(): [string, any][] {
    return Object.entries(this.data);
  }

  get(key: string) {
    return this.data[key];
  }

  clone(): Properties {
    const newData: Record<string, any> = {};
    for (const [k, v] of Object.entries(this.data)) {
      newData[k] = v;
    }
    return new Properties(newData);
  }

  toCompoundTag(): CompoundTag {
    let result = {} as Record<string, any>;
    for (const [k, v] of Object.entries(this.data)) {
      result[k] = v;
    }
    return new CompoundTag(result);
  }
}
