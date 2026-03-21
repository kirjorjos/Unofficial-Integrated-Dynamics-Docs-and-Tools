import { FloatTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Double } from "JavaNumberClasses/Double";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_FLOAT extends BaseOperator<FloatTag, Double> {
  static override internalName = "integrateddynamics:nbt_as_float" as const;
  static override nicknames = ["nbtAsFloat"];
  static override symbol = "NBT.as_float";
  static override interactName = "nbtAsFloat";
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
