import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_INT extends BaseOperator<IntTag, Integer> {
  static override internalName = "integrateddynamics:nbt_as_int" as const;
  static override numericID = 247;
  static override nicknames = ["asInt", "nbtAsInt", "as_int", "nbt_as_int"];
  static override symbol = "NBT.as_int";
  static override interactName = "nbtAsInt";
  static override operatorName = "as_int" as const;
  static override displayName = "NBT Integer As Integer" as const;
  static override fullDisplayName = "NBT NBT Integer As Integer" as const;
  static override stringDisplayNames = [
    "nbt integer as integer",
    "nbt integer as Integer",
    "nbt integer As integer",
    "nbt integer As Integer",
    "nbt Integer as integer",
    "nbt Integer as Integer",
    "nbt Integer As integer",
    "nbt Integer As Integer",
    "Nbt integer as integer",
    "Nbt integer as Integer",
    "Nbt integer As integer",
    "Nbt integer As Integer",
    "Nbt Integer as integer",
    "Nbt Integer as Integer",
    "Nbt Integer As integer",
    "Nbt Integer As Integer",
    "NBT integer as integer",
    "NBT integer as Integer",
    "NBT integer As integer",
    "NBT integer As Integer",
    "NBT Integer as integer",
    "NBT Integer as Integer",
    "NBT Integer As integer",
    "NBT Integer As Integer",
    "nbt nbt integer as integer",
    "nbt nbt integer as Integer",
    "nbt nbt integer As integer",
    "nbt nbt integer As Integer",
    "nbt nbt Integer as integer",
    "nbt nbt Integer as Integer",
    "nbt nbt Integer As integer",
    "nbt nbt Integer As Integer",
    "nbt Nbt integer as integer",
    "nbt Nbt integer as Integer",
    "nbt Nbt integer As integer",
    "nbt Nbt integer As Integer",
    "nbt Nbt Integer as integer",
    "nbt Nbt Integer as Integer",
    "nbt Nbt Integer As integer",
    "nbt Nbt Integer As Integer",
    "Nbt nbt integer as integer",
    "Nbt nbt integer as Integer",
    "Nbt nbt integer As integer",
    "Nbt nbt integer As Integer",
    "Nbt nbt Integer as integer",
    "Nbt nbt Integer as Integer",
    "Nbt nbt Integer As integer",
    "Nbt nbt Integer As Integer",
    "Nbt Nbt integer as integer",
    "Nbt Nbt integer as Integer",
    "Nbt Nbt integer As integer",
    "Nbt Nbt integer As Integer",
    "Nbt Nbt Integer as integer",
    "Nbt Nbt Integer as Integer",
    "Nbt Nbt Integer As integer",
    "Nbt Nbt Integer As Integer",
    "nbt NBT integer as integer",
    "nbt NBT integer as Integer",
    "nbt NBT integer As integer",
    "nbt NBT integer As Integer",
    "nbt NBT Integer as integer",
    "nbt NBT Integer as Integer",
    "nbt NBT Integer As integer",
    "nbt NBT Integer As Integer",
    "Nbt NBT integer as integer",
    "Nbt NBT integer as Integer",
    "Nbt NBT integer As integer",
    "Nbt NBT integer As Integer",
    "Nbt NBT Integer as integer",
    "Nbt NBT Integer as Integer",
    "Nbt NBT Integer As integer",
    "Nbt NBT Integer As Integer",
    "NBT nbt integer as integer",
    "NBT nbt integer as Integer",
    "NBT nbt integer As integer",
    "NBT nbt integer As Integer",
    "NBT nbt Integer as integer",
    "NBT nbt Integer as Integer",
    "NBT nbt Integer As integer",
    "NBT nbt Integer As Integer",
    "NBT Nbt integer as integer",
    "NBT Nbt integer as Integer",
    "NBT Nbt integer As integer",
    "NBT Nbt integer As Integer",
    "NBT Nbt Integer as integer",
    "NBT Nbt Integer as Integer",
    "NBT Nbt Integer As integer",
    "NBT Nbt Integer As Integer",
    "NBT NBT integer as integer",
    "NBT NBT integer as Integer",
    "NBT NBT integer As integer",
    "NBT NBT integer As Integer",
    "NBT NBT Integer as integer",
    "NBT NBT Integer as Integer",
    "NBT NBT Integer As integer",
    "NBT NBT Integer As Integer",
  ];
  static override tooltipInfo =
    "Get the Integer value of the given NBT Integer tag" as const;

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
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (nbt: IntTag): Integer => {
        if (nbt.getType() === Tag.TAG_INT) {
          return nbt.valueOf();
        } else {
          return Integer.ZERO;
        }
      },
    });
  }
}
