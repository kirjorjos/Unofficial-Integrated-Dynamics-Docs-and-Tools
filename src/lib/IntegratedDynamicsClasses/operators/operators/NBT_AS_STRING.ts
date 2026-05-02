import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_STRING extends BaseOperator<StringTag, iString> {
  static override internalName = "integrateddynamics:nbt_as_string" as const;
  static override numericID = 252;
  static override nicknames = [
    "asString",
    "nbtAsString",
    "as_string",
    "nbt_as_string",
  ];
  static override symbol = "NBT.as_string";
  static override interactName = "nbtAsString";
  static override operatorName = "as_string" as const;
  static override displayName = "NBT String As String" as const;
  static override fullDisplayName = "NBT NBT String As String" as const;
  static override tooltipInfo =
    "Get the String value of the given NBT String tag" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
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
