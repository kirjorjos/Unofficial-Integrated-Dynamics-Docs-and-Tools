import { ShortTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_SHORT extends BaseOperator<ShortTag, Integer> {
  static override internalName = "integrateddynamics:nbt_as_short" as const;
  static override numericID = 251;
  static override nicknames = [
    "asShort",
    "nbtAsShort",
    "as_short",
    "nbt_as_short",
  ];
  static override symbol = "NBT.as_short";
  static override interactName = "nbtAsShort";
  static override operatorName = "as_short" as const;
  static override displayName = "NBT Short as Integer" as const;
  static override fullDisplayName = "NBT NBT Short as Integer" as const;
  static override stringDisplayNames = [
    "nbt short as integer",
    "nbt short as Integer",
    "nbt short As integer",
    "nbt short As Integer",
    "nbt Short as integer",
    "nbt Short as Integer",
    "nbt Short As integer",
    "nbt Short As Integer",
    "Nbt short as integer",
    "Nbt short as Integer",
    "Nbt short As integer",
    "Nbt short As Integer",
    "Nbt Short as integer",
    "Nbt Short as Integer",
    "Nbt Short As integer",
    "Nbt Short As Integer",
    "NBT short as integer",
    "NBT short as Integer",
    "NBT short As integer",
    "NBT short As Integer",
    "NBT Short as integer",
    "NBT Short as Integer",
    "NBT Short As integer",
    "NBT Short As Integer",
    "nbt nbt short as integer",
    "nbt nbt short as Integer",
    "nbt nbt short As integer",
    "nbt nbt short As Integer",
    "nbt nbt Short as integer",
    "nbt nbt Short as Integer",
    "nbt nbt Short As integer",
    "nbt nbt Short As Integer",
    "nbt Nbt short as integer",
    "nbt Nbt short as Integer",
    "nbt Nbt short As integer",
    "nbt Nbt short As Integer",
    "nbt Nbt Short as integer",
    "nbt Nbt Short as Integer",
    "nbt Nbt Short As integer",
    "nbt Nbt Short As Integer",
    "Nbt nbt short as integer",
    "Nbt nbt short as Integer",
    "Nbt nbt short As integer",
    "Nbt nbt short As Integer",
    "Nbt nbt Short as integer",
    "Nbt nbt Short as Integer",
    "Nbt nbt Short As integer",
    "Nbt nbt Short As Integer",
    "Nbt Nbt short as integer",
    "Nbt Nbt short as Integer",
    "Nbt Nbt short As integer",
    "Nbt Nbt short As Integer",
    "Nbt Nbt Short as integer",
    "Nbt Nbt Short as Integer",
    "Nbt Nbt Short As integer",
    "Nbt Nbt Short As Integer",
    "nbt NBT short as integer",
    "nbt NBT short as Integer",
    "nbt NBT short As integer",
    "nbt NBT short As Integer",
    "nbt NBT Short as integer",
    "nbt NBT Short as Integer",
    "nbt NBT Short As integer",
    "nbt NBT Short As Integer",
    "Nbt NBT short as integer",
    "Nbt NBT short as Integer",
    "Nbt NBT short As integer",
    "Nbt NBT short As Integer",
    "Nbt NBT Short as integer",
    "Nbt NBT Short as Integer",
    "Nbt NBT Short As integer",
    "Nbt NBT Short As Integer",
    "NBT nbt short as integer",
    "NBT nbt short as Integer",
    "NBT nbt short As integer",
    "NBT nbt short As Integer",
    "NBT nbt Short as integer",
    "NBT nbt Short as Integer",
    "NBT nbt Short As integer",
    "NBT nbt Short As Integer",
    "NBT Nbt short as integer",
    "NBT Nbt short as Integer",
    "NBT Nbt short As integer",
    "NBT Nbt short As Integer",
    "NBT Nbt Short as integer",
    "NBT Nbt Short as Integer",
    "NBT Nbt Short As integer",
    "NBT Nbt Short As Integer",
    "NBT NBT short as integer",
    "NBT NBT short as Integer",
    "NBT NBT short As integer",
    "NBT NBT short As Integer",
    "NBT NBT Short as integer",
    "NBT NBT Short as Integer",
    "NBT NBT Short As integer",
    "NBT NBT Short As Integer",
  ];
  static override tooltipInfo =
    "Get the Integer value of the given NBT Short tag" as const;

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
        if (nbt.getType() === Tag.TAG_SHORT) {
          return nbt.valueOf();
        } else {
          return Integer.ZERO;
        }
      },
    });
  }
}
