import { globalMap } from "HelperClasses/TypeMap";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_STRING extends BaseOperator<StringTag, iString> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_as_string",
      nicknames: ["nbtAsString"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_string",
      interactName: "nbtAsString",
      function: (nbt: StringTag): iString => {
        if (nbt.getType() === Tag.TAG_STRING) {
          return nbt.valueOf();
        } else {
          return new iString("");
        }
      },
    });
  }
}
