import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NBT_FROM_STRING extends BaseOperator<iString, StringTag> {
  static override internalName = "integrateddynamics:nbt_from_string" as const;
  static override numericID = 264;
  static override nicknames = ["stringAsNbt", "nbtFromString"];
  static override symbol = "NBT.from_string";
  static override interactName = "stringAsNbt";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (str: iString): StringTag => {
        return new StringTag(str);
      },
    });
  }
}
