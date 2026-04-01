import { FloatTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Double } from "lib/JavaNumberClasses/Double";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_FLOAT extends BaseOperator<FloatTag, Double> {
  static override internalName = "integrateddynamics:nbt_as_float" as const;
  static override numericID = 245;
  static override nicknames = ["nbtAsFloat", "as_float", "nbtAs_float"];
  static override symbol = "NBT.as_float";
  static override interactName = "nbtAsFloat";
  static override operatorName = "as_float" as const;
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
