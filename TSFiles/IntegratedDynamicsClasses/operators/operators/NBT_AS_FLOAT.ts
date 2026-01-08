import { TypeMap } from "HelperClasses/TypeMap";
import { FloatTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Double } from "JavaNumberClasses/Double";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_FLOAT extends BaseOperator<FloatTag, Double> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_as_float",
      nicknames: ["nbtAsFloat"],
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
        globalMap
      ),
      symbol: "NBT.as_float",
      interactName: "nbtAsFloat",
      function: (nbt: FloatTag): Double => {
        if (nbt.getType() === Tag.TAG_DOUBLE) {
          return nbt.valueOf();
        } else {
          return new Double(0);
        }
      },
    });
  }
}
