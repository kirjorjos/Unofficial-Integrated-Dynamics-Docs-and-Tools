import { ShortTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_SHORT extends BaseOperator<Integer, ShortTag> {
  static override internalName = "integrateddynamics:nbt_from_short" as const;
  static override numericID = 263;
  static override nicknames = [
    "fromShort",
    "nbtFromShort",
    "shortAsNbt",
    "from_short",
    "nbt_from_short",
    "nbtFrom_short",
    "short_as_nbt",
  ];
  static override symbol = "NBT.from_short";
  static override interactName = "shortAsNbt";
  static override operatorName = "from_short" as const;
  static override displayName = "NBT Short From Integer" as const;
  static override fullDisplayName = "NBT NBT Short From Integer" as const;
  static override tooltipInfo =
    "Create an NBT Short tag from the given Integer value" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (short: Integer): ShortTag => {
        return new ShortTag(short);
      },
    });
  }
}
