import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Double } from "lib/JavaNumberClasses/Double";

export class OPERATOR_NBT_FROM_DOUBLE extends BaseOperator<Double, DoubleTag> {
  static override internalName = "integrateddynamics:nbt_from_double" as const;
  static override numericID = 256;
  static override nicknames = [
    "doubleAsNbt",
    "nbtFromDouble",
    "from_double",
    "nbtFrom_double",
  ];
  static override symbol = "NBT.from_double";
  static override interactName = "doubleAsNbt";
  static override operatorName = "from_double" as const;
  static override displayName = "NBT Double From Double" as const;
  static override fullDisplayName = "NBT NBT Double From Double" as const;
  static override tooltipInfo =
    "Create an NBT Double tag from the given Double value" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (double: Double): DoubleTag => {
        return new DoubleTag(double);
      },
    });
  }
}
