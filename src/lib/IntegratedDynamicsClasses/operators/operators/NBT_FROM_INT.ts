import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_INT extends BaseOperator<Integer, IntTag> {
  static override internalName = "integrateddynamics:nbt_from_int" as const;
  static override numericID = 259;
  static override nicknames = [
    "fromInt",
    "integerAsNbt",
    "nbtFromInt",
    "from_int",
    "integer_as_nbt",
    "nbt_from_int",
    "nbtFrom_int",
  ];
  static override symbol = "NBT.from_int";
  static override interactName = "integerAsNbt";
  static override operatorName = "from_int" as const;
  static override displayName = "NBT Integer From Integer" as const;
  static override fullDisplayName = "NBT NBT Integer From Integer" as const;
  static override tooltipInfo =
    "Create an NBT Integer tag from the given Integer value" as const;

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
      function: (int: Integer): IntTag => {
        return new IntTag(int);
      },
    });
  }
}
