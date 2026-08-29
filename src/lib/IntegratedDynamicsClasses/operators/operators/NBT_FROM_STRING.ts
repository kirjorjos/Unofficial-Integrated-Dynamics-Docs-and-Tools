import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NBT_FROM_STRING extends BaseOperator<iString, StringTag> {
  static override internalName = "integrateddynamics:nbt_from_string" as const;
  static override numericID = 264;
  static override nicknames = [
    "fromString",
    "nbtFromString",
    "stringAsNbt",
    "from_string",
    "nbt_from_string",
    "string_as_nbt",
  ];
  static override symbol = "NBT.from_string";
  static override interactName = "stringAsNbt";
  static override operatorName = "from_string" as const;
  static override displayName = "NBT String From String" as const;
  static override fullDisplayName = "NBT NBT String From String" as const;
  static override stringDisplayNames = [
    "nbt string from string",
    "nbt string from String",
    "nbt string From string",
    "nbt string From String",
    "nbt String from string",
    "nbt String from String",
    "nbt String From string",
    "nbt String From String",
    "Nbt string from string",
    "Nbt string from String",
    "Nbt string From string",
    "Nbt string From String",
    "Nbt String from string",
    "Nbt String from String",
    "Nbt String From string",
    "Nbt String From String",
    "NBT string from string",
    "NBT string from String",
    "NBT string From string",
    "NBT string From String",
    "NBT String from string",
    "NBT String from String",
    "NBT String From string",
    "NBT String From String",
    "nbt nbt string from string",
    "nbt nbt string from String",
    "nbt nbt string From string",
    "nbt nbt string From String",
    "nbt nbt String from string",
    "nbt nbt String from String",
    "nbt nbt String From string",
    "nbt nbt String From String",
    "nbt Nbt string from string",
    "nbt Nbt string from String",
    "nbt Nbt string From string",
    "nbt Nbt string From String",
    "nbt Nbt String from string",
    "nbt Nbt String from String",
    "nbt Nbt String From string",
    "nbt Nbt String From String",
    "Nbt nbt string from string",
    "Nbt nbt string from String",
    "Nbt nbt string From string",
    "Nbt nbt string From String",
    "Nbt nbt String from string",
    "Nbt nbt String from String",
    "Nbt nbt String From string",
    "Nbt nbt String From String",
    "Nbt Nbt string from string",
    "Nbt Nbt string from String",
    "Nbt Nbt string From string",
    "Nbt Nbt string From String",
    "Nbt Nbt String from string",
    "Nbt Nbt String from String",
    "Nbt Nbt String From string",
    "Nbt Nbt String From String",
    "nbt NBT string from string",
    "nbt NBT string from String",
    "nbt NBT string From string",
    "nbt NBT string From String",
    "nbt NBT String from string",
    "nbt NBT String from String",
    "nbt NBT String From string",
    "nbt NBT String From String",
    "Nbt NBT string from string",
    "Nbt NBT string from String",
    "Nbt NBT string From string",
    "Nbt NBT string From String",
    "Nbt NBT String from string",
    "Nbt NBT String from String",
    "Nbt NBT String From string",
    "Nbt NBT String From String",
    "NBT nbt string from string",
    "NBT nbt string from String",
    "NBT nbt string From string",
    "NBT nbt string From String",
    "NBT nbt String from string",
    "NBT nbt String from String",
    "NBT nbt String From string",
    "NBT nbt String From String",
    "NBT Nbt string from string",
    "NBT Nbt string from String",
    "NBT Nbt string From string",
    "NBT Nbt string From String",
    "NBT Nbt String from string",
    "NBT Nbt String from String",
    "NBT Nbt String From string",
    "NBT Nbt String From String",
    "NBT NBT string from string",
    "NBT NBT string from String",
    "NBT NBT string From string",
    "NBT NBT string From String",
    "NBT NBT String from string",
    "NBT NBT String from String",
    "NBT NBT String From string",
    "NBT NBT String From String",
  ];
  static override tooltipInfo =
    "Create an NBT String tag from the given String value" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
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
