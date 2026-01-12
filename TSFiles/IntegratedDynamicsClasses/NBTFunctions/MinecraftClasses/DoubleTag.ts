import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

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
    return new iString("DoubleTag");
  }

  equals(tag: Tag<IntegratedValue>): iBoolean {
    if (tag.getType() != Tag.TAG_DOUBLE) return new iBoolean(false);
    return new iBoolean(this.getAsDouble() == (tag as DoubleTag).getAsDouble());
  }
}
