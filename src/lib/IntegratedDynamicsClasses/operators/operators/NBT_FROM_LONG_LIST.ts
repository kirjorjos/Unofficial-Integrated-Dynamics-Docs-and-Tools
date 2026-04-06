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
  static override nicknames = [
    "longListAsNbt",
    "nbtFromLongList",
    "from_long_list",
    "nbtFrom_long_list",
  ];
  static override symbol = "NBT.from_long_list";
  static override interactName = "longListAsNbt";
  static override operatorName = "from_long_list" as const;
  static override displayName = "NBT Long Array From Long List" as const;
  static override fullDisplayName =
    "NBT NBT Long Array From Long List" as const;
  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
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
