import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NBT_FROM_STRING extends BaseOperator<iString, StringTag> {
  static override internalName = "integrateddynamics:nbt_from_string" as const;
  static override nicknames = ["nbtFromString"];
  static override symbol = "NBT.from_string";
  static override interactName = "stringAsNbt";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "NBT",
        },
      }),
      function: (str: iString): StringTag => {
        return new StringTag(str);
      },
    });
  }
}
