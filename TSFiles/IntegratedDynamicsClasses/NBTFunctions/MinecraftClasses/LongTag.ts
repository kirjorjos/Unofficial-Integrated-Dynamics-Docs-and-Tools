import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";

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

  getTypeAsString(): string {
    return "LongTag";
  }

  equals(tag: Tag<IntegratedValue>) {
    if (tag.getType() != Tag.TAG_BYTE) return false;
    return this.valueOf() == tag.valueOf();
  }
}
