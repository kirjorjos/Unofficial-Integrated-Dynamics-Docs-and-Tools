import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { NumericTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NumericTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class ShortTag extends NumericTag {
  protected data: Integer;

  constructor(data: Integer) {
    super();
    this.data = data;
  }

  override getType(): number {
    return Tag.TAG_SHORT;
  }

  static override valueOf(value: Integer): ShortTag {
    return new ShortTag(value);
  }

  override valueOf(): Integer {
    return this.data;
  }

  getAsDouble(): number {
    return this.data.toJSNumber();
  }

  override getTypeAsString(): iString {
    return new iString("SHORT");
  }

  equals(tag: Tag<IntegratedValue>): iBoolean {
    if (tag.getType() != Tag.TAG_SHORT) return new iBoolean(false);
    return this.valueOf().equals(tag.valueOf());
  }

  toJSON(): number {
    return this.data.toJSNumber();
  }
}
