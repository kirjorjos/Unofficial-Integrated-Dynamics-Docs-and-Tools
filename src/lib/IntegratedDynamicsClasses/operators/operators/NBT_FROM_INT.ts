import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_INT extends BaseOperator<Integer, IntTag> {
  static override internalName = "integrateddynamics:nbt_from_int" as const;
  static override numericID = 259;
  static override nicknames = [
    "fromInt",
    "integerAsNbt",
    "nbtFromInt",
    "from_int",
    "integer_as_nbt",
    "nbt_from_int",
  ];
  static override symbol = "NBT.from_int";
  static override interactName = "integerAsNbt";
  static override operatorName = "from_int" as const;
  static override displayName = "NBT Integer From Integer" as const;
  static override fullDisplayName = "NBT NBT Integer From Integer" as const;
  static override stringDisplayNames = [
    "nbt integer from integer",
    "nbt integer from Integer",
    "nbt integer From integer",
    "nbt integer From Integer",
    "nbt Integer from integer",
    "nbt Integer from Integer",
    "nbt Integer From integer",
    "nbt Integer From Integer",
    "Nbt integer from integer",
    "Nbt integer from Integer",
    "Nbt integer From integer",
    "Nbt integer From Integer",
    "Nbt Integer from integer",
    "Nbt Integer from Integer",
    "Nbt Integer From integer",
    "Nbt Integer From Integer",
    "NBT integer from integer",
    "NBT integer from Integer",
    "NBT integer From integer",
    "NBT integer From Integer",
    "NBT Integer from integer",
    "NBT Integer from Integer",
    "NBT Integer From integer",
    "NBT Integer From Integer",
    "nbt nbt integer from integer",
    "nbt nbt integer from Integer",
    "nbt nbt integer From integer",
    "nbt nbt integer From Integer",
    "nbt nbt Integer from integer",
    "nbt nbt Integer from Integer",
    "nbt nbt Integer From integer",
    "nbt nbt Integer From Integer",
    "nbt Nbt integer from integer",
    "nbt Nbt integer from Integer",
    "nbt Nbt integer From integer",
    "nbt Nbt integer From Integer",
    "nbt Nbt Integer from integer",
    "nbt Nbt Integer from Integer",
    "nbt Nbt Integer From integer",
    "nbt Nbt Integer From Integer",
    "Nbt nbt integer from integer",
    "Nbt nbt integer from Integer",
    "Nbt nbt integer From integer",
    "Nbt nbt integer From Integer",
    "Nbt nbt Integer from integer",
    "Nbt nbt Integer from Integer",
    "Nbt nbt Integer From integer",
    "Nbt nbt Integer From Integer",
    "Nbt Nbt integer from integer",
    "Nbt Nbt integer from Integer",
    "Nbt Nbt integer From integer",
    "Nbt Nbt integer From Integer",
    "Nbt Nbt Integer from integer",
    "Nbt Nbt Integer from Integer",
    "Nbt Nbt Integer From integer",
    "Nbt Nbt Integer From Integer",
    "nbt NBT integer from integer",
    "nbt NBT integer from Integer",
    "nbt NBT integer From integer",
    "nbt NBT integer From Integer",
    "nbt NBT Integer from integer",
    "nbt NBT Integer from Integer",
    "nbt NBT Integer From integer",
    "nbt NBT Integer From Integer",
    "Nbt NBT integer from integer",
    "Nbt NBT integer from Integer",
    "Nbt NBT integer From integer",
    "Nbt NBT integer From Integer",
    "Nbt NBT Integer from integer",
    "Nbt NBT Integer from Integer",
    "Nbt NBT Integer From integer",
    "Nbt NBT Integer From Integer",
    "NBT nbt integer from integer",
    "NBT nbt integer from Integer",
    "NBT nbt integer From integer",
    "NBT nbt integer From Integer",
    "NBT nbt Integer from integer",
    "NBT nbt Integer from Integer",
    "NBT nbt Integer From integer",
    "NBT nbt Integer From Integer",
    "NBT Nbt integer from integer",
    "NBT Nbt integer from Integer",
    "NBT Nbt integer From integer",
    "NBT Nbt integer From Integer",
    "NBT Nbt Integer from integer",
    "NBT Nbt Integer from Integer",
    "NBT Nbt Integer From integer",
    "NBT Nbt Integer From Integer",
    "NBT NBT integer from integer",
    "NBT NBT integer from Integer",
    "NBT NBT integer From integer",
    "NBT NBT integer From Integer",
    "NBT NBT Integer from integer",
    "NBT NBT Integer from Integer",
    "NBT NBT Integer From integer",
    "NBT NBT Integer From Integer",
  ];
  static override tooltipInfo =
    "Create an NBT Integer tag from the given Integer value" as const;

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
      function: (int: Integer): IntTag => {
        return new IntTag(int);
      },
    });
  }
}
