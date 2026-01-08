import { TypeMap } from "HelperClasses/TypeMap";
import { DoubleTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Double } from "JavaNumberClasses/Double";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_DOUBLE extends BaseOperator<DoubleTag, Double> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_as_double",
      nicknames: ["nbtAsDouble"],
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
      symbol: "NBT.as_double",
      interactName: "nbtAsDouble",
      function: (nbt: DoubleTag): Double => {
        if (nbt.getType() === Tag.TAG_DOUBLE) {
          return nbt.valueOf();
        } else {
          return new Double(0);
        }
      },
    });
  }
}
