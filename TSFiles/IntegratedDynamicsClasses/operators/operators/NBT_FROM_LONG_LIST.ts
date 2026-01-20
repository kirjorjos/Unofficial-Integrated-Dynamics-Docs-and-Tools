import { LongArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongArrayTag";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Long } from "JavaNumberClasses/Long";

export class OPERATOR_NBT_FROM_LONG_LIST extends BaseOperator<
  iArray<Long>,
  LongArrayTag
> {
    static override internalName = "integrateddynamics:nbt_from_long_list"
  constructor() {
    super({
      nicknames: ["nbtFromLongList"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Long" } },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_long_list",
      interactName: "longListAsNbt",
      function: (longList: iArray<Long>): LongArrayTag => {
        return new LongArrayTag(longList);
      },
    });
  }
}
