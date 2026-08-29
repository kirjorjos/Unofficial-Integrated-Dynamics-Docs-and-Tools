import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_BYTE extends BaseOperator<ByteTag, Integer> {
  static override internalName = "integrateddynamics:nbt_as_byte" as const;
  static override numericID = 242;
  static override nicknames = ["asByte", "nbtAsByte", "as_byte", "nbt_as_byte"];
  static override symbol = "NBT.as_byte";
  static override interactName = "nbtAsByte";
  static override operatorName = "as_byte" as const;
  static override displayName = "NBT Byte As Integer" as const;
  static override fullDisplayName = "NBT NBT Byte As Integer" as const;
  static override stringDisplayNames = [
    "nbt byte as integer",
    "nbt byte as Integer",
    "nbt byte As integer",
    "nbt byte As Integer",
    "nbt Byte as integer",
    "nbt Byte as Integer",
    "nbt Byte As integer",
    "nbt Byte As Integer",
    "Nbt byte as integer",
    "Nbt byte as Integer",
    "Nbt byte As integer",
    "Nbt byte As Integer",
    "Nbt Byte as integer",
    "Nbt Byte as Integer",
    "Nbt Byte As integer",
    "Nbt Byte As Integer",
    "NBT byte as integer",
    "NBT byte as Integer",
    "NBT byte As integer",
    "NBT byte As Integer",
    "NBT Byte as integer",
    "NBT Byte as Integer",
    "NBT Byte As integer",
    "NBT Byte As Integer",
    "nbt nbt byte as integer",
    "nbt nbt byte as Integer",
    "nbt nbt byte As integer",
    "nbt nbt byte As Integer",
    "nbt nbt Byte as integer",
    "nbt nbt Byte as Integer",
    "nbt nbt Byte As integer",
    "nbt nbt Byte As Integer",
    "nbt Nbt byte as integer",
    "nbt Nbt byte as Integer",
    "nbt Nbt byte As integer",
    "nbt Nbt byte As Integer",
    "nbt Nbt Byte as integer",
    "nbt Nbt Byte as Integer",
    "nbt Nbt Byte As integer",
    "nbt Nbt Byte As Integer",
    "Nbt nbt byte as integer",
    "Nbt nbt byte as Integer",
    "Nbt nbt byte As integer",
    "Nbt nbt byte As Integer",
    "Nbt nbt Byte as integer",
    "Nbt nbt Byte as Integer",
    "Nbt nbt Byte As integer",
    "Nbt nbt Byte As Integer",
    "Nbt Nbt byte as integer",
    "Nbt Nbt byte as Integer",
    "Nbt Nbt byte As integer",
    "Nbt Nbt byte As Integer",
    "Nbt Nbt Byte as integer",
    "Nbt Nbt Byte as Integer",
    "Nbt Nbt Byte As integer",
    "Nbt Nbt Byte As Integer",
    "nbt NBT byte as integer",
    "nbt NBT byte as Integer",
    "nbt NBT byte As integer",
    "nbt NBT byte As Integer",
    "nbt NBT Byte as integer",
    "nbt NBT Byte as Integer",
    "nbt NBT Byte As integer",
    "nbt NBT Byte As Integer",
    "Nbt NBT byte as integer",
    "Nbt NBT byte as Integer",
    "Nbt NBT byte As integer",
    "Nbt NBT byte As Integer",
    "Nbt NBT Byte as integer",
    "Nbt NBT Byte as Integer",
    "Nbt NBT Byte As integer",
    "Nbt NBT Byte As Integer",
    "NBT nbt byte as integer",
    "NBT nbt byte as Integer",
    "NBT nbt byte As integer",
    "NBT nbt byte As Integer",
    "NBT nbt Byte as integer",
    "NBT nbt Byte as Integer",
    "NBT nbt Byte As integer",
    "NBT nbt Byte As Integer",
    "NBT Nbt byte as integer",
    "NBT Nbt byte as Integer",
    "NBT Nbt byte As integer",
    "NBT Nbt byte As Integer",
    "NBT Nbt Byte as integer",
    "NBT Nbt Byte as Integer",
    "NBT Nbt Byte As integer",
    "NBT Nbt Byte As Integer",
    "NBT NBT byte as integer",
    "NBT NBT byte as Integer",
    "NBT NBT byte As integer",
    "NBT NBT byte As Integer",
    "NBT NBT Byte as integer",
    "NBT NBT Byte as Integer",
    "NBT NBT Byte As integer",
    "NBT NBT Byte As Integer",
  ];
  static override tooltipInfo =
    "Get the Integer value of the given NBT Byte tag" as const;

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
      function: (nbt: ByteTag): Integer => {
        if (nbt.getType() === Tag.TAG_BYTE) {
          return nbt.valueOf();
        } else {
          return Integer.ZERO;
        }
      },
    });
  }
}
