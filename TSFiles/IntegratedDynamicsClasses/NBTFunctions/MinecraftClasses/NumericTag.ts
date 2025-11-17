import { Tag } from "./Tag";

export abstract class NumericTag extends Tag<TypeNumber> {
  constructor() {
    super();
  }

  getType(): number {
    return Tag.TAG_NUMERIC;
  }

  abstract getAsDouble(): number;
}
