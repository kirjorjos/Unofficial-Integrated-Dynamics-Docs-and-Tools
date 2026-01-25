import { DoubleTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Double } from "JavaNumberClasses/Double";

export class OPERATOR_NBT_FROM_DOUBLE extends BaseOperator<Double, DoubleTag> {
  static override internalName = "integrateddynamics:nbt_from_double" as const;
  constructor() {
    super({
      nicknames: ["nbtFromDouble"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Double",
        },
        to: {
          type: "NBT",
        },
      }),
      symbol: "NBT.from_double",
      interactName: "doubleAsNbt",
      function: (double: Double): DoubleTag => {
        return new DoubleTag(double);
      },
    });
  }
}
