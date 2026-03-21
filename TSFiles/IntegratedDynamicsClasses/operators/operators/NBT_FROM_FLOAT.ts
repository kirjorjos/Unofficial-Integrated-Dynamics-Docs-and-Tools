import { FloatTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Double } from "JavaNumberClasses/Double";

export class OPERATOR_NBT_FROM_FLOAT extends BaseOperator<Double, FloatTag> {
  static override internalName = "integrateddynamics:nbt_from_float" as const;
  static override nicknames = ["floatAsNbt", "nbtFromFloat"];
  static override symbol = "NBT.from_float";
  static override interactName = "floatAsNbt";
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
      function: (float: Double): FloatTag => {
        return new FloatTag(float);
      },
    });
  }
}
