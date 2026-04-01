import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Long } from "lib/JavaNumberClasses/Long";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_LONG extends BaseOperator<LongTag, Long> {
  static override internalName = "integrateddynamics:nbt_as_long" as const;
  static override numericID = 249;
  static override nicknames = ["nbtAsLong", "as_long", "nbtAs_long"];
  static override symbol = "NBT.as_long";
  static override interactName = "nbtAsLong";
  static override operatorName = "as_long" as const;
  static override kind = "nbt" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Long",
          },
        },
        normalizeSignature
      ),
      function: (nbt: LongTag): Long => {
        if (nbt.getType() === Tag.TAG_LONG) {
          return nbt.valueOf();
        } else {
          return Long.ZERO;
        }
      },
    });
  }
}
