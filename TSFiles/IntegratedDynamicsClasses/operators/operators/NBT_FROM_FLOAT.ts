import { globalMap } from "HelperClasses/TypeMap";
import { FloatTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Double } from "JavaNumberClasses/Double";

export class OPERATOR_NBT_FROM_FLOAT extends BaseOperator<Double, FloatTag> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_from_float",
      nicknames: ["nbtFromFloat"],
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
        globalMap
      ),
      symbol: "NBT.from_float",
      interactName: "floatAsNbt",
      function: (float: Double): FloatTag => {
        return new FloatTag(float);
      },
    });
  }
}
