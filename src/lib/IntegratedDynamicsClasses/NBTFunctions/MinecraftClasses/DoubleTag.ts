import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { NumericTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NumericTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class DoubleTag extends NumericTag {
  protected data: Double;

  override getType(): number {
    return Tag.TAG_DOUBLE;
  }

  constructor(data: Double) {
    super();
    this.data = data;
  }

  static override valueOf(value: Double): DoubleTag {
    return new DoubleTag(value);
  }

  override valueOf(): Double {
    return this.data;
  }

  getAsDouble(): number {
    return this.data.toJSNumber();
  }

  override getTypeAsString(): iString {
    return new iString("DOUBLE");
  }

  equals(tag: Tag<IntegratedValue>): iBoolean {
    if (tag.getType() != Tag.TAG_DOUBLE) return new iBoolean(false);
    return this.valueOf().equals(tag.valueOf());
  }

  toJSON(): number {
    return this.data.toJSNumber();
  }
}
