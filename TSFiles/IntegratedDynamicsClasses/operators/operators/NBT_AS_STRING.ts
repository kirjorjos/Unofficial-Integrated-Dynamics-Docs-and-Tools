import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_STRING extends BaseOperator<StringTag, iString> {
  static override internalName = "integrateddynamics:nbt_as_string" as const;
  static override nicknames = ["nbtAsString"];
  static override symbol = "NBT.as_string";
  static override interactName = "nbtAsString";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "NBT",
        },
        to: {
          type: "String",
        },
      }),
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
