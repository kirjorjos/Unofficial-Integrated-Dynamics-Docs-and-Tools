import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Long } from "lib/JavaNumberClasses/Long";

export class OPERATOR_NBT_FROM_LONG extends BaseOperator<Long, LongTag> {
  static override internalName = "integrateddynamics:nbt_from_long" as const;
  static override numericID = 261;
  static override nicknames = [
    "fromLong",
    "longAsNbt",
    "nbtFromLong",
    "from_long",
    "long_as_nbt",
    "nbt_from_long",
  ];
  static override symbol = "NBT.from_long";
  static override interactName = "longAsNbt";
  static override operatorName = "from_long" as const;
  static override displayName = "NBT Long From Long" as const;
  static override fullDisplayName = "NBT NBT Long From Long" as const;
  static override stringDisplayNames = [
    "nbt long from long",
    "nbt long from Long",
    "nbt long From long",
    "nbt long From Long",
    "nbt Long from long",
    "nbt Long from Long",
    "nbt Long From long",
    "nbt Long From Long",
    "Nbt long from long",
    "Nbt long from Long",
    "Nbt long From long",
    "Nbt long From Long",
    "Nbt Long from long",
    "Nbt Long from Long",
    "Nbt Long From long",
    "Nbt Long From Long",
    "NBT long from long",
    "NBT long from Long",
    "NBT long From long",
    "NBT long From Long",
    "NBT Long from long",
    "NBT Long from Long",
    "NBT Long From long",
    "NBT Long From Long",
    "nbt nbt long from long",
    "nbt nbt long from Long",
    "nbt nbt long From long",
    "nbt nbt long From Long",
    "nbt nbt Long from long",
    "nbt nbt Long from Long",
    "nbt nbt Long From long",
    "nbt nbt Long From Long",
    "nbt Nbt long from long",
    "nbt Nbt long from Long",
    "nbt Nbt long From long",
    "nbt Nbt long From Long",
    "nbt Nbt Long from long",
    "nbt Nbt Long from Long",
    "nbt Nbt Long From long",
    "nbt Nbt Long From Long",
    "Nbt nbt long from long",
    "Nbt nbt long from Long",
    "Nbt nbt long From long",
    "Nbt nbt long From Long",
    "Nbt nbt Long from long",
    "Nbt nbt Long from Long",
    "Nbt nbt Long From long",
    "Nbt nbt Long From Long",
    "Nbt Nbt long from long",
    "Nbt Nbt long from Long",
    "Nbt Nbt long From long",
    "Nbt Nbt long From Long",
    "Nbt Nbt Long from long",
    "Nbt Nbt Long from Long",
    "Nbt Nbt Long From long",
    "Nbt Nbt Long From Long",
    "nbt NBT long from long",
    "nbt NBT long from Long",
    "nbt NBT long From long",
    "nbt NBT long From Long",
    "nbt NBT Long from long",
    "nbt NBT Long from Long",
    "nbt NBT Long From long",
    "nbt NBT Long From Long",
    "Nbt NBT long from long",
    "Nbt NBT long from Long",
    "Nbt NBT long From long",
    "Nbt NBT long From Long",
    "Nbt NBT Long from long",
    "Nbt NBT Long from Long",
    "Nbt NBT Long From long",
    "Nbt NBT Long From Long",
    "NBT nbt long from long",
    "NBT nbt long from Long",
    "NBT nbt long From long",
    "NBT nbt long From Long",
    "NBT nbt Long from long",
    "NBT nbt Long from Long",
    "NBT nbt Long From long",
    "NBT nbt Long From Long",
    "NBT Nbt long from long",
    "NBT Nbt long from Long",
    "NBT Nbt long From long",
    "NBT Nbt long From Long",
    "NBT Nbt Long from long",
    "NBT Nbt Long from Long",
    "NBT Nbt Long From long",
    "NBT Nbt Long From Long",
    "NBT NBT long from long",
    "NBT NBT long from Long",
    "NBT NBT long From long",
    "NBT NBT long From Long",
    "NBT NBT Long from long",
    "NBT NBT Long from Long",
    "NBT NBT Long From long",
    "NBT NBT Long From Long",
  ];
  static override tooltipInfo =
    "Create an NBT Long tag from the given Long value" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Long",
          },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (long: Long): LongTag => {
        return new LongTag(long);
      },
    });
  }
}
