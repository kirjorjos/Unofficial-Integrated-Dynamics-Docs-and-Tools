import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Double } from "lib/JavaNumberClasses/Double";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_DOUBLE extends BaseOperator<DoubleTag, Double> {
  static override internalName = "integrateddynamics:nbt_as_double" as const;
  static override numericID = 244;
  static override nicknames = [
    "asDouble",
    "nbtAsDouble",
    "as_double",
    "nbt_as_double",
  ];
  static override symbol = "NBT.as_double";
  static override interactName = "nbtAsDouble";
  static override operatorName = "as_double" as const;
  static override displayName = "NBT Double As Double" as const;
  static override fullDisplayName = "NBT NBT Double As Double" as const;
  static override stringDisplayNames = [
    "nbt double as double",
    "nbt double as Double",
    "nbt double As double",
    "nbt double As Double",
    "nbt Double as double",
    "nbt Double as Double",
    "nbt Double As double",
    "nbt Double As Double",
    "Nbt double as double",
    "Nbt double as Double",
    "Nbt double As double",
    "Nbt double As Double",
    "Nbt Double as double",
    "Nbt Double as Double",
    "Nbt Double As double",
    "Nbt Double As Double",
    "NBT double as double",
    "NBT double as Double",
    "NBT double As double",
    "NBT double As Double",
    "NBT Double as double",
    "NBT Double as Double",
    "NBT Double As double",
    "NBT Double As Double",
    "nbt nbt double as double",
    "nbt nbt double as Double",
    "nbt nbt double As double",
    "nbt nbt double As Double",
    "nbt nbt Double as double",
    "nbt nbt Double as Double",
    "nbt nbt Double As double",
    "nbt nbt Double As Double",
    "nbt Nbt double as double",
    "nbt Nbt double as Double",
    "nbt Nbt double As double",
    "nbt Nbt double As Double",
    "nbt Nbt Double as double",
    "nbt Nbt Double as Double",
    "nbt Nbt Double As double",
    "nbt Nbt Double As Double",
    "Nbt nbt double as double",
    "Nbt nbt double as Double",
    "Nbt nbt double As double",
    "Nbt nbt double As Double",
    "Nbt nbt Double as double",
    "Nbt nbt Double as Double",
    "Nbt nbt Double As double",
    "Nbt nbt Double As Double",
    "Nbt Nbt double as double",
    "Nbt Nbt double as Double",
    "Nbt Nbt double As double",
    "Nbt Nbt double As Double",
    "Nbt Nbt Double as double",
    "Nbt Nbt Double as Double",
    "Nbt Nbt Double As double",
    "Nbt Nbt Double As Double",
    "nbt NBT double as double",
    "nbt NBT double as Double",
    "nbt NBT double As double",
    "nbt NBT double As Double",
    "nbt NBT Double as double",
    "nbt NBT Double as Double",
    "nbt NBT Double As double",
    "nbt NBT Double As Double",
    "Nbt NBT double as double",
    "Nbt NBT double as Double",
    "Nbt NBT double As double",
    "Nbt NBT double As Double",
    "Nbt NBT Double as double",
    "Nbt NBT Double as Double",
    "Nbt NBT Double As double",
    "Nbt NBT Double As Double",
    "NBT nbt double as double",
    "NBT nbt double as Double",
    "NBT nbt double As double",
    "NBT nbt double As Double",
    "NBT nbt Double as double",
    "NBT nbt Double as Double",
    "NBT nbt Double As double",
    "NBT nbt Double As Double",
    "NBT Nbt double as double",
    "NBT Nbt double as Double",
    "NBT Nbt double As double",
    "NBT Nbt double As Double",
    "NBT Nbt Double as double",
    "NBT Nbt Double as Double",
    "NBT Nbt Double As double",
    "NBT Nbt Double As Double",
    "NBT NBT double as double",
    "NBT NBT double as Double",
    "NBT NBT double As double",
    "NBT NBT double As Double",
    "NBT NBT Double as double",
    "NBT NBT Double as Double",
    "NBT NBT Double As double",
    "NBT NBT Double As Double",
  ];
  static override tooltipInfo =
    "Get the Double value of the given NBT Double tag" as const;

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
            type: "Double",
          },
        },
        normalizeSignature
      ),
      function: (nbt: DoubleTag): Double => {
        if (nbt.getType() === Tag.TAG_DOUBLE) {
          return nbt.valueOf();
        } else {
          return Double.ZERO;
        }
      },
    });
  }
}
