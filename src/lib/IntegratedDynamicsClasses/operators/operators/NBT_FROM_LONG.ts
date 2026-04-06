import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Long } from "lib/JavaNumberClasses/Long";

export class OPERATOR_NBT_FROM_LONG extends BaseOperator<Long, LongTag> {
  static override internalName = "integrateddynamics:nbt_from_long" as const;
  static override numericID = 261;
  static override nicknames = [
    "longAsNbt",
    "nbtFromLong",
    "from_long",
    "nbtFrom_long",
  ];
  static override symbol = "NBT.from_long";
  static override interactName = "longAsNbt";
  static override operatorName = "from_long" as const;
  static override displayName = "NBT Long From Long" as const;
  static override fullDisplayName = "NBT NBT Long From Long" as const;
  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Long",
          },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (long: Long): LongTag => {
        return new LongTag(long);
      },
    });
  }
}
