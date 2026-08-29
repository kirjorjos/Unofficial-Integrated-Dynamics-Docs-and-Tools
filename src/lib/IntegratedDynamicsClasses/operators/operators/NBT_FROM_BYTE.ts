import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";

export class OPERATOR_NBT_FROM_BYTE extends BaseOperator<Integer, ByteTag> {
  static override internalName = "integrateddynamics:nbt_from_byte" as const;
  static override numericID = 254;
  static override nicknames = [
    "byteAsNbt",
    "fromByte",
    "nbtFromByte",
    "byte_as_nbt",
    "from_byte",
    "nbt_from_byte",
  ];
  static override symbol = "NBT.from_byte";
  static override interactName = "byteAsNbt";
  static override operatorName = "from_byte" as const;
  static override displayName = "NBT Byte From Integer" as const;
  static override fullDisplayName = "NBT NBT Byte From Integer" as const;
  static override stringDisplayNames = [
    "nbt byte from integer",
    "nbt byte from Integer",
    "nbt byte From integer",
    "nbt byte From Integer",
    "nbt Byte from integer",
    "nbt Byte from Integer",
    "nbt Byte From integer",
    "nbt Byte From Integer",
    "Nbt byte from integer",
    "Nbt byte from Integer",
    "Nbt byte From integer",
    "Nbt byte From Integer",
    "Nbt Byte from integer",
    "Nbt Byte from Integer",
    "Nbt Byte From integer",
    "Nbt Byte From Integer",
    "NBT byte from integer",
    "NBT byte from Integer",
    "NBT byte From integer",
    "NBT byte From Integer",
    "NBT Byte from integer",
    "NBT Byte from Integer",
    "NBT Byte From integer",
    "NBT Byte From Integer",
    "nbt nbt byte from integer",
    "nbt nbt byte from Integer",
    "nbt nbt byte From integer",
    "nbt nbt byte From Integer",
    "nbt nbt Byte from integer",
    "nbt nbt Byte from Integer",
    "nbt nbt Byte From integer",
    "nbt nbt Byte From Integer",
    "nbt Nbt byte from integer",
    "nbt Nbt byte from Integer",
    "nbt Nbt byte From integer",
    "nbt Nbt byte From Integer",
    "nbt Nbt Byte from integer",
    "nbt Nbt Byte from Integer",
    "nbt Nbt Byte From integer",
    "nbt Nbt Byte From Integer",
    "Nbt nbt byte from integer",
    "Nbt nbt byte from Integer",
    "Nbt nbt byte From integer",
    "Nbt nbt byte From Integer",
    "Nbt nbt Byte from integer",
    "Nbt nbt Byte from Integer",
    "Nbt nbt Byte From integer",
    "Nbt nbt Byte From Integer",
    "Nbt Nbt byte from integer",
    "Nbt Nbt byte from Integer",
    "Nbt Nbt byte From integer",
    "Nbt Nbt byte From Integer",
    "Nbt Nbt Byte from integer",
    "Nbt Nbt Byte from Integer",
    "Nbt Nbt Byte From integer",
    "Nbt Nbt Byte From Integer",
    "nbt NBT byte from integer",
    "nbt NBT byte from Integer",
    "nbt NBT byte From integer",
    "nbt NBT byte From Integer",
    "nbt NBT Byte from integer",
    "nbt NBT Byte from Integer",
    "nbt NBT Byte From integer",
    "nbt NBT Byte From Integer",
    "Nbt NBT byte from integer",
    "Nbt NBT byte from Integer",
    "Nbt NBT byte From integer",
    "Nbt NBT byte From Integer",
    "Nbt NBT Byte from integer",
    "Nbt NBT Byte from Integer",
    "Nbt NBT Byte From integer",
    "Nbt NBT Byte From Integer",
    "NBT nbt byte from integer",
    "NBT nbt byte from Integer",
    "NBT nbt byte From integer",
    "NBT nbt byte From Integer",
    "NBT nbt Byte from integer",
    "NBT nbt Byte from Integer",
    "NBT nbt Byte From integer",
    "NBT nbt Byte From Integer",
    "NBT Nbt byte from integer",
    "NBT Nbt byte from Integer",
    "NBT Nbt byte From integer",
    "NBT Nbt byte From Integer",
    "NBT Nbt Byte from integer",
    "NBT Nbt Byte from Integer",
    "NBT Nbt Byte From integer",
    "NBT Nbt Byte From Integer",
    "NBT NBT byte from integer",
    "NBT NBT byte from Integer",
    "NBT NBT byte From integer",
    "NBT NBT byte From Integer",
    "NBT NBT Byte from integer",
    "NBT NBT Byte from Integer",
    "NBT NBT Byte From integer",
    "NBT NBT Byte From Integer",
  ];
  static override tooltipInfo =
    "Create an NBT Byte tag from the given Integer value" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (byte: Integer): ByteTag => {
        return new ByteTag(byte);
      },
    });
  }
}
