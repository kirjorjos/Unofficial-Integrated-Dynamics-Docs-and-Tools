import { ShortTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_SHORT extends BaseOperator<Integer, ShortTag> {
  static override internalName = "integrateddynamics:nbt_from_short" as const;
  static override numericID = 263;
  static override nicknames = [
    "fromShort",
    "nbtFromShort",
    "shortAsNbt",
    "from_short",
    "nbt_from_short",
    "short_as_nbt",
  ];
  static override symbol = "NBT.from_short";
  static override interactName = "shortAsNbt";
  static override operatorName = "from_short" as const;
  static override displayName = "NBT Short From Integer" as const;
  static override fullDisplayName = "NBT NBT Short From Integer" as const;
  static override stringDisplayNames = [
    "nbt short from integer",
    "nbt short from Integer",
    "nbt short From integer",
    "nbt short From Integer",
    "nbt Short from integer",
    "nbt Short from Integer",
    "nbt Short From integer",
    "nbt Short From Integer",
    "Nbt short from integer",
    "Nbt short from Integer",
    "Nbt short From integer",
    "Nbt short From Integer",
    "Nbt Short from integer",
    "Nbt Short from Integer",
    "Nbt Short From integer",
    "Nbt Short From Integer",
    "NBT short from integer",
    "NBT short from Integer",
    "NBT short From integer",
    "NBT short From Integer",
    "NBT Short from integer",
    "NBT Short from Integer",
    "NBT Short From integer",
    "NBT Short From Integer",
    "nbt nbt short from integer",
    "nbt nbt short from Integer",
    "nbt nbt short From integer",
    "nbt nbt short From Integer",
    "nbt nbt Short from integer",
    "nbt nbt Short from Integer",
    "nbt nbt Short From integer",
    "nbt nbt Short From Integer",
    "nbt Nbt short from integer",
    "nbt Nbt short from Integer",
    "nbt Nbt short From integer",
    "nbt Nbt short From Integer",
    "nbt Nbt Short from integer",
    "nbt Nbt Short from Integer",
    "nbt Nbt Short From integer",
    "nbt Nbt Short From Integer",
    "Nbt nbt short from integer",
    "Nbt nbt short from Integer",
    "Nbt nbt short From integer",
    "Nbt nbt short From Integer",
    "Nbt nbt Short from integer",
    "Nbt nbt Short from Integer",
    "Nbt nbt Short From integer",
    "Nbt nbt Short From Integer",
    "Nbt Nbt short from integer",
    "Nbt Nbt short from Integer",
    "Nbt Nbt short From integer",
    "Nbt Nbt short From Integer",
    "Nbt Nbt Short from integer",
    "Nbt Nbt Short from Integer",
    "Nbt Nbt Short From integer",
    "Nbt Nbt Short From Integer",
    "nbt NBT short from integer",
    "nbt NBT short from Integer",
    "nbt NBT short From integer",
    "nbt NBT short From Integer",
    "nbt NBT Short from integer",
    "nbt NBT Short from Integer",
    "nbt NBT Short From integer",
    "nbt NBT Short From Integer",
    "Nbt NBT short from integer",
    "Nbt NBT short from Integer",
    "Nbt NBT short From integer",
    "Nbt NBT short From Integer",
    "Nbt NBT Short from integer",
    "Nbt NBT Short from Integer",
    "Nbt NBT Short From integer",
    "Nbt NBT Short From Integer",
    "NBT nbt short from integer",
    "NBT nbt short from Integer",
    "NBT nbt short From integer",
    "NBT nbt short From Integer",
    "NBT nbt Short from integer",
    "NBT nbt Short from Integer",
    "NBT nbt Short From integer",
    "NBT nbt Short From Integer",
    "NBT Nbt short from integer",
    "NBT Nbt short from Integer",
    "NBT Nbt short From integer",
    "NBT Nbt short From Integer",
    "NBT Nbt Short from integer",
    "NBT Nbt Short from Integer",
    "NBT Nbt Short From integer",
    "NBT Nbt Short From Integer",
    "NBT NBT short from integer",
    "NBT NBT short from Integer",
    "NBT NBT short From integer",
    "NBT NBT short From Integer",
    "NBT NBT Short from integer",
    "NBT NBT Short from Integer",
    "NBT NBT Short From integer",
    "NBT NBT Short From Integer",
  ];
  static override tooltipInfo =
    "Create an NBT Short tag from the given Integer value" as const;

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
      function: (short: Integer): ShortTag => {
        return new ShortTag(short);
      },
    });
  }
}
