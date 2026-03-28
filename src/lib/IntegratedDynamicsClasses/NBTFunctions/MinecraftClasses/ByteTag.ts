import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { NumericTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NumericTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "lib/JavaNumberClasses/Integer";

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
