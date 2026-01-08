import { TypeMap } from "HelperClasses/TypeMap";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_SHORT extends BaseOperator<IntTag, Integer> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_as_short",
      nicknames: ["nbtAsShort"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_short",
      interactName: "nbtAsShort",
      function: (nbt: IntTag): Integer => {
        if (nbt.getType() === Tag.TAG_INT) {
          return nbt.valueOf();
        } else {
          return new Integer(0);
        }
      },
    });
  }
}
