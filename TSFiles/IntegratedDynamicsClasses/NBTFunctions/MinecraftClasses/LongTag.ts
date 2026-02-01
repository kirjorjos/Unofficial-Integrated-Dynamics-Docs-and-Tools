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
    return Tag.TAG_LONG;
  }

  static override valueOf(value: Long): LongTag {
    return new LongTag(value);
  }

  override valueOf(): Long {
    return this.data;
  }

  getAsDouble(): number {
    return this.data.toJSNumber();
  }

  getTypeAsString(): iString {
    return new iString("LONG");
  }

  equals(tag: Tag<IntegratedValue>): iBoolean {
    if (tag.getType() != Tag.TAG_LONG) return new iBoolean(false);
    return this.valueOf().equals(tag.valueOf());
  }

  toJSON(): number {
    return this.data.toJSNumber();
  }
}
