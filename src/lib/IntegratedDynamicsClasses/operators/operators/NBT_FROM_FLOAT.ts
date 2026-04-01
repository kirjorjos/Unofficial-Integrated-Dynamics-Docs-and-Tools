import { FloatTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Double } from "lib/JavaNumberClasses/Double";

export class OPERATOR_NBT_FROM_FLOAT extends BaseOperator<Double, FloatTag> {
  static override internalName = "integrateddynamics:nbt_from_float" as const;
  static override numericID = 257;
  static override nicknames = [
    "floatAsNbt",
    "nbtFromFloat",
    "from_float",
    "nbtFrom_float",
  ];
  static override symbol = "NBT.from_float";
  static override interactName = "floatAsNbt";
  static override operatorName = "from_float" as const;
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
      function: (float: Double): FloatTag => {
        return new FloatTag(float);
      },
    });
  }
}
