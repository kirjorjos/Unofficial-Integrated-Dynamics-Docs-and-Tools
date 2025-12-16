import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

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
    return parseInt(this.data.toDecimal());
  }

  override getTypeAsString(): iString {
    return new iString("FloatTag");
  }

  equals(tag: Tag<IntegratedValue>): iBoolean {
    if (tag.getType() != Tag.TAG_FLOAT) return new iBoolean(false);
    return new iBoolean(this.getAsDouble() == (tag as FloatTag).getAsDouble());
  }
}
