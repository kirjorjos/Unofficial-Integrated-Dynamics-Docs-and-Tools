import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class LongTag extends NumericTag {
  protected data: Long;

  constructor(data: Long) {
    super();
    this.data = data;
  }

  override getType(): number {
    return Tag.TAG_BYTE;
  }

  static override valueOf(value: Long): LongTag {
    return new LongTag(value);
  }

  override valueOf(): Long {
    return this.data;
  }

  getAsDouble(): number {
    return parseInt(this.data.toDecimal());
  }

  getTypeAsString(): iString {
    return new iString("LongTag");
  }

  equals(tag: Tag<IntegratedValue>) {
    if (tag.getType() != Tag.TAG_BYTE) return new iBoolean(false);
    return new iBoolean(this.valueOf() == tag.valueOf());
  }
}
