import { FloatTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Double } from "lib/JavaNumberClasses/Double";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_FLOAT extends BaseOperator<FloatTag, Double> {
  static override internalName = "integrateddynamics:nbt_as_float" as const;
  static override numericID = 245;
  static override nicknames = [
    "asFloat",
    "nbtAsFloat",
    "as_float",
    "nbt_as_float",
  ];
  static override symbol = "NBT.as_float";
  static override interactName = "nbtAsFloat";
  static override operatorName = "as_float" as const;
  static override displayName = "NBT Float As Double" as const;
  static override fullDisplayName = "NBT NBT Float As Double" as const;
  static override stringDisplayNames = [
    "nbt float as double",
    "nbt float as Double",
    "nbt float As double",
    "nbt float As Double",
    "nbt Float as double",
    "nbt Float as Double",
    "nbt Float As double",
    "nbt Float As Double",
    "Nbt float as double",
    "Nbt float as Double",
    "Nbt float As double",
    "Nbt float As Double",
    "Nbt Float as double",
    "Nbt Float as Double",
    "Nbt Float As double",
    "Nbt Float As Double",
    "NBT float as double",
    "NBT float as Double",
    "NBT float As double",
    "NBT float As Double",
    "NBT Float as double",
    "NBT Float as Double",
    "NBT Float As double",
    "NBT Float As Double",
    "nbt nbt float as double",
    "nbt nbt float as Double",
    "nbt nbt float As double",
    "nbt nbt float As Double",
    "nbt nbt Float as double",
    "nbt nbt Float as Double",
    "nbt nbt Float As double",
    "nbt nbt Float As Double",
    "nbt Nbt float as double",
    "nbt Nbt float as Double",
    "nbt Nbt float As double",
    "nbt Nbt float As Double",
    "nbt Nbt Float as double",
    "nbt Nbt Float as Double",
    "nbt Nbt Float As double",
    "nbt Nbt Float As Double",
    "Nbt nbt float as double",
    "Nbt nbt float as Double",
    "Nbt nbt float As double",
    "Nbt nbt float As Double",
    "Nbt nbt Float as double",
    "Nbt nbt Float as Double",
    "Nbt nbt Float As double",
    "Nbt nbt Float As Double",
    "Nbt Nbt float as double",
    "Nbt Nbt float as Double",
    "Nbt Nbt float As double",
    "Nbt Nbt float As Double",
    "Nbt Nbt Float as double",
    "Nbt Nbt Float as Double",
    "Nbt Nbt Float As double",
    "Nbt Nbt Float As Double",
    "nbt NBT float as double",
    "nbt NBT float as Double",
    "nbt NBT float As double",
    "nbt NBT float As Double",
    "nbt NBT Float as double",
    "nbt NBT Float as Double",
    "nbt NBT Float As double",
    "nbt NBT Float As Double",
    "Nbt NBT float as double",
    "Nbt NBT float as Double",
    "Nbt NBT float As double",
    "Nbt NBT float As Double",
    "Nbt NBT Float as double",
    "Nbt NBT Float as Double",
    "Nbt NBT Float As double",
    "Nbt NBT Float As Double",
    "NBT nbt float as double",
    "NBT nbt float as Double",
    "NBT nbt float As double",
    "NBT nbt float As Double",
    "NBT nbt Float as double",
    "NBT nbt Float as Double",
    "NBT nbt Float As double",
    "NBT nbt Float As Double",
    "NBT Nbt float as double",
    "NBT Nbt float as Double",
    "NBT Nbt float As double",
    "NBT Nbt float As Double",
    "NBT Nbt Float as double",
    "NBT Nbt Float as Double",
    "NBT Nbt Float As double",
    "NBT Nbt Float As Double",
    "NBT NBT float as double",
    "NBT NBT float as Double",
    "NBT NBT float As double",
    "NBT NBT float As Double",
    "NBT NBT Float as double",
    "NBT NBT Float as Double",
    "NBT NBT Float As double",
    "NBT NBT Float As Double",
  ];
  static override tooltipInfo =
    "Get the Double value of the given NBT Float tag" as const;

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
      function: (nbt: FloatTag): Double => {
        if (nbt.getType() === Tag.TAG_FLOAT) {
          return nbt.valueOf();
        } else {
          return Double.ZERO;
        }
      },
    });
  }
}
