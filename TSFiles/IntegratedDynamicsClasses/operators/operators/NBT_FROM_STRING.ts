import { globalMap } from "HelperClasses/TypeMap";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NBT_FROM_STRING extends BaseOperator<iString, StringTag> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_from_string",
      nicknames: ["nbtFromString"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_string",
      interactName: "stringAsNbt",
      function: (str: iString): StringTag => {
        return new StringTag(str);
      },
    });
  }
}
