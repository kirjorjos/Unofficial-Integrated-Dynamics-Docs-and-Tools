import { LongArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongArrayTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Long } from "JavaNumberClasses/Long";

export class OPERATOR_NBT_FROM_LONG_LIST extends BaseOperator<
  iArray<Long>,
  LongArrayTag
> {
  static override internalName =
    "integrateddynamics:nbt_from_long_list" as const;
  static override nicknames = ["nbtFromLongList"];
  static override symbol = "NBT.from_long_list";
  static override interactName = "longListAsNbt";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: { type: "List", listType: { type: "Long" } },
        to: {
          type: "NBT",
        },
      }),
      function: (longList: iArray<Long>): LongArrayTag => {
        return new LongArrayTag(longList);
      },
    });
  }
}
