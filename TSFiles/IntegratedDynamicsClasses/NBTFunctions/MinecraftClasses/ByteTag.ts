import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";

export class ByteTag extends NumericTag {
  protected data: Integer;

  constructor(data: Integer) {
    super();
    this.data = data;
  }

  override getType(): number {
    return Tag.TAG_BYTE;
  }

  static override valueOf(value: Integer): ByteTag {
    return new ByteTag(value);
  }

  override valueOf(): Integer {
    return this.data;
  }

  getAsDouble(): number {
    return this.data.toJSNumber();
  }

  override getTypeAsString(): iString {
    return new iString("BYTE");
  }

  equals(tag: Tag<IntegratedValue>) {
    if (tag.getType() != Tag.TAG_BYTE) return new iBoolean(false);
    return this.valueOf().equals(tag.valueOf());
  }

  toJSON(): number {
    return this.data.toJSNumber();
  }

  static ONE: ByteTag = new ByteTag(Integer.ONE);
}
