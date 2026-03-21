import { DoubleTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Double } from "JavaNumberClasses/Double";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_DOUBLE extends BaseOperator<DoubleTag, Double> {
  static override internalName = "integrateddynamics:nbt_as_double" as const;
  static override nicknames = ["nbtAsDouble"];
  static override symbol = "NBT.as_double";
  static override interactName = "nbtAsDouble";
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
