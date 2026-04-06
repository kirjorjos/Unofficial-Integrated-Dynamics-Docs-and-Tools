import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Double } from "lib/JavaNumberClasses/Double";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_DOUBLE extends BaseOperator<DoubleTag, Double> {
  static override internalName = "integrateddynamics:nbt_as_double" as const;
  static override numericID = 244;
  static override nicknames = ["nbtAsDouble", "as_double", "nbtAs_double"];
  static override symbol = "NBT.as_double";
  static override interactName = "nbtAsDouble";
  static override operatorName = "as_double" as const;
  static override displayName = "NBT Double As Double" as const;
  static override fullDisplayName = "NBT NBT Double As Double" as const;
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
