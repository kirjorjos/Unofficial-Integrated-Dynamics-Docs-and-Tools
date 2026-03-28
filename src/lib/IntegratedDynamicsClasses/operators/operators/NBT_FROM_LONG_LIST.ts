import { LongArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongArrayTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Long } from "lib/JavaNumberClasses/Long";

export class OPERATOR_NBT_FROM_LONG_LIST extends BaseOperator<
  iArray<Long>,
  LongArrayTag
> {
  static override internalName =
    "integrateddynamics:nbt_from_long_list" as const;
  static override numericID = 262;
  static override nicknames = ["longListAsNbt", "nbtFromLongList"];
  static override symbol = "NBT.from_long_list";
  static override interactName = "longListAsNbt";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Long" } },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (longList: iArray<Long>): LongArrayTag => {
        return new LongArrayTag(longList);
      },
    });
  }
}
