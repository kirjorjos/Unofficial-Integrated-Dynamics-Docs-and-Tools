import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class ShortTag extends NumericTag {
  protected data: Integer;

  constructor(data: Integer) {
    super();
    this.data = data;
  }

  override getType(): number {
    return Tag.TAG_Short;
  }

  static override valueOf(value: Integer): ShortTag {
    return new ShortTag(value);
  }

  override valueOf(): Integer {
    return this.data;
  }

  getAsDouble(): number {
    return parseInt(this.data.toDecimal());
  }

  override getTypeAsString(): iString {
    return new iString("ShortTag");
  }

  equals(tag: Tag<IntegratedValue>) {
    if (tag.getType() != Tag.TAG_Short) return new iBoolean(false);
    return new iBoolean(this.valueOf() == tag.valueOf());
  }
}
