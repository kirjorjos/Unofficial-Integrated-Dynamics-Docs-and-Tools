import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Double } from "lib/JavaNumberClasses/Double";

export class OPERATOR_NBT_FROM_DOUBLE extends BaseOperator<Double, DoubleTag> {
  static override internalName = "integrateddynamics:nbt_from_double" as const;
  static override numericID = 256;
  static override nicknames = [
    "doubleAsNbt",
    "fromDouble",
    "nbtFromDouble",
    "double_as_nbt",
    "from_double",
    "nbt_from_double",
  ];
  static override symbol = "NBT.from_double";
  static override interactName = "doubleAsNbt";
  static override operatorName = "from_double" as const;
  static override displayName = "NBT Double From Double" as const;
  static override fullDisplayName = "NBT NBT Double From Double" as const;
  static override stringDisplayNames = [
    "nbt double from double",
    "nbt double from Double",
    "nbt double From double",
    "nbt double From Double",
    "nbt Double from double",
    "nbt Double from Double",
    "nbt Double From double",
    "nbt Double From Double",
    "Nbt double from double",
    "Nbt double from Double",
    "Nbt double From double",
    "Nbt double From Double",
    "Nbt Double from double",
    "Nbt Double from Double",
    "Nbt Double From double",
    "Nbt Double From Double",
    "NBT double from double",
    "NBT double from Double",
    "NBT double From double",
    "NBT double From Double",
    "NBT Double from double",
    "NBT Double from Double",
    "NBT Double From double",
    "NBT Double From Double",
    "nbt nbt double from double",
    "nbt nbt double from Double",
    "nbt nbt double From double",
    "nbt nbt double From Double",
    "nbt nbt Double from double",
    "nbt nbt Double from Double",
    "nbt nbt Double From double",
    "nbt nbt Double From Double",
    "nbt Nbt double from double",
    "nbt Nbt double from Double",
    "nbt Nbt double From double",
    "nbt Nbt double From Double",
    "nbt Nbt Double from double",
    "nbt Nbt Double from Double",
    "nbt Nbt Double From double",
    "nbt Nbt Double From Double",
    "Nbt nbt double from double",
    "Nbt nbt double from Double",
    "Nbt nbt double From double",
    "Nbt nbt double From Double",
    "Nbt nbt Double from double",
    "Nbt nbt Double from Double",
    "Nbt nbt Double From double",
    "Nbt nbt Double From Double",
    "Nbt Nbt double from double",
    "Nbt Nbt double from Double",
    "Nbt Nbt double From double",
    "Nbt Nbt double From Double",
    "Nbt Nbt Double from double",
    "Nbt Nbt Double from Double",
    "Nbt Nbt Double From double",
    "Nbt Nbt Double From Double",
    "nbt NBT double from double",
    "nbt NBT double from Double",
    "nbt NBT double From double",
    "nbt NBT double From Double",
    "nbt NBT Double from double",
    "nbt NBT Double from Double",
    "nbt NBT Double From double",
    "nbt NBT Double From Double",
    "Nbt NBT double from double",
    "Nbt NBT double from Double",
    "Nbt NBT double From double",
    "Nbt NBT double From Double",
    "Nbt NBT Double from double",
    "Nbt NBT Double from Double",
    "Nbt NBT Double From double",
    "Nbt NBT Double From Double",
    "NBT nbt double from double",
    "NBT nbt double from Double",
    "NBT nbt double From double",
    "NBT nbt double From Double",
    "NBT nbt Double from double",
    "NBT nbt Double from Double",
    "NBT nbt Double From double",
    "NBT nbt Double From Double",
    "NBT Nbt double from double",
    "NBT Nbt double from Double",
    "NBT Nbt double From double",
    "NBT Nbt double From Double",
    "NBT Nbt Double from double",
    "NBT Nbt Double from Double",
    "NBT Nbt Double From double",
    "NBT Nbt Double From Double",
    "NBT NBT double from double",
    "NBT NBT double from Double",
    "NBT NBT double From double",
    "NBT NBT double From Double",
    "NBT NBT Double from double",
    "NBT NBT Double from Double",
    "NBT NBT Double From double",
    "NBT NBT Double From Double",
  ];
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
