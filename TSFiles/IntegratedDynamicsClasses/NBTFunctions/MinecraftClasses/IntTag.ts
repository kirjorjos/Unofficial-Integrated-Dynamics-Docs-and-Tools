import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { NumericTag } from "./NumericTag";
import { Tag } from "./Tag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class IntTag extends NumericTag {
  protected data: Integer;

  constructor(data: Integer) {
    super();
    this.data = data;
  }

  override getType(): number {
    return Tag.TAG_INT;
  }

  static override valueOf(value: Integer): IntTag {
    return new IntTag(value);
  }

  override valueOf(): Integer {
    return this.data;
  }

  getAsDouble(): number {
    return this.data.toJSNumber();
  }

  getTypeAsString(): iString {
    return new iString("INT");
  }

  equals(tag: Tag<IntegratedValue>) {
    if (tag.getType() != Tag.TAG_INT) return new iBoolean(false);
    return this.valueOf().equals(tag.valueOf());
  }
}
