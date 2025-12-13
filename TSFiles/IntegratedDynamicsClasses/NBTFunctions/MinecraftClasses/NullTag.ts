import { iNull } from "IntegratedDynamicsClasses/typeWrappers/iNull";
import { Tag } from "./Tag";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class NullTag extends Tag<iNull> {
  constructor() {
    super();
  }

  override getType(): number {
    return Tag.TAG_NULL;
  }

  override valueOf(): iNull {
    return new iNull();
  }

  override getTypeAsString(): iString {
    return new iString("NullTag");
  }

  override equals(tag: Tag<iNull>): iBoolean {
    return new iBoolean(tag.getType() == Tag.TAG_NULL);
  }
}
