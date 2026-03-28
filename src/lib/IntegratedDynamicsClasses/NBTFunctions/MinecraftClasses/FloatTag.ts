import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { NumericTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NumericTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class FloatTag extends NumericTag {
  protected data: Double;

  override getType(): number {
    return Tag.TAG_FLOAT;
  }

  constructor(data: Double) {
    super();
    this.data = data;
  }

  static override valueOf(value: Double): FloatTag {
    return new FloatTag(value);
  }

  override valueOf(): Double {
    return this.data;
  }

  getAsDouble(): number {
    return this.data.toJSNumber();
  }

  override getTypeAsString(): iString {
    return new iString("FLOAT");
  }

  equals(tag: Tag<IntegratedValue>): iBoolean {
    if (tag.getType() != Tag.TAG_FLOAT) return new iBoolean(false);
    return this.valueOf().equals(tag.valueOf());
  }

  toJSON(): number {
    return this.data.toJSNumber();
  }
}
