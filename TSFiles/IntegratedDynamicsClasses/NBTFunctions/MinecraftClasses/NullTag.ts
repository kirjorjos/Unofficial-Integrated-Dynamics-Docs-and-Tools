import { iNull } from "IntegratedDynamicsClasses/typeWrappers/iNull";
import { Tag } from "./Tag";

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

  override getTypeAsString(): string {
    return "NullTag";
  }

  override equals(tag: Tag<iNull>): boolean {
    return tag.getType() == Tag.TAG_NULL;
  }
}
