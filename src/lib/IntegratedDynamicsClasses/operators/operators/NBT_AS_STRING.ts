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
  static override stringDisplayNames = [
    "nbt string as string",
    "nbt string as String",
    "nbt string As string",
    "nbt string As String",
    "nbt String as string",
    "nbt String as String",
    "nbt String As string",
    "nbt String As String",
    "Nbt string as string",
    "Nbt string as String",
    "Nbt string As string",
    "Nbt string As String",
    "Nbt String as string",
    "Nbt String as String",
    "Nbt String As string",
    "Nbt String As String",
    "NBT string as string",
    "NBT string as String",
    "NBT string As string",
    "NBT string As String",
    "NBT String as string",
    "NBT String as String",
    "NBT String As string",
    "NBT String As String",
    "nbt nbt string as string",
    "nbt nbt string as String",
    "nbt nbt string As string",
    "nbt nbt string As String",
    "nbt nbt String as string",
    "nbt nbt String as String",
    "nbt nbt String As string",
    "nbt nbt String As String",
    "nbt Nbt string as string",
    "nbt Nbt string as String",
    "nbt Nbt string As string",
    "nbt Nbt string As String",
    "nbt Nbt String as string",
    "nbt Nbt String as String",
    "nbt Nbt String As string",
    "nbt Nbt String As String",
    "Nbt nbt string as string",
    "Nbt nbt string as String",
    "Nbt nbt string As string",
    "Nbt nbt string As String",
    "Nbt nbt String as string",
    "Nbt nbt String as String",
    "Nbt nbt String As string",
    "Nbt nbt String As String",
    "Nbt Nbt string as string",
    "Nbt Nbt string as String",
    "Nbt Nbt string As string",
    "Nbt Nbt string As String",
    "Nbt Nbt String as string",
    "Nbt Nbt String as String",
    "Nbt Nbt String As string",
    "Nbt Nbt String As String",
    "nbt NBT string as string",
    "nbt NBT string as String",
    "nbt NBT string As string",
    "nbt NBT string As String",
    "nbt NBT String as string",
    "nbt NBT String as String",
    "nbt NBT String As string",
    "nbt NBT String As String",
    "Nbt NBT string as string",
    "Nbt NBT string as String",
    "Nbt NBT string As string",
    "Nbt NBT string As String",
    "Nbt NBT String as string",
    "Nbt NBT String as String",
    "Nbt NBT String As string",
    "Nbt NBT String As String",
    "NBT nbt string as string",
    "NBT nbt string as String",
    "NBT nbt string As string",
    "NBT nbt string As String",
    "NBT nbt String as string",
    "NBT nbt String as String",
    "NBT nbt String As string",
    "NBT nbt String As String",
    "NBT Nbt string as string",
    "NBT Nbt string as String",
    "NBT Nbt string As string",
    "NBT Nbt string As String",
    "NBT Nbt String as string",
    "NBT Nbt String as String",
    "NBT Nbt String As string",
    "NBT Nbt String As String",
    "NBT NBT string as string",
    "NBT NBT string as String",
    "NBT NBT string As string",
    "NBT NBT string As String",
    "NBT NBT String as string",
    "NBT NBT String as String",
    "NBT NBT String As string",
    "NBT NBT String As String",
  ];
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
