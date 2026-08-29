import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Long } from "lib/JavaNumberClasses/Long";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_LONG extends BaseOperator<LongTag, Long> {
  static override internalName = "integrateddynamics:nbt_as_long" as const;
  static override numericID = 249;
  static override nicknames = ["asLong", "nbtAsLong", "as_long", "nbt_as_long"];
  static override symbol = "NBT.as_long";
  static override interactName = "nbtAsLong";
  static override operatorName = "as_long" as const;
  static override displayName = "NBT Long As Long" as const;
  static override fullDisplayName = "NBT NBT Long As Long" as const;
  static override stringDisplayNames = [
    "nbt long as long",
    "nbt long as Long",
    "nbt long As long",
    "nbt long As Long",
    "nbt Long as long",
    "nbt Long as Long",
    "nbt Long As long",
    "nbt Long As Long",
    "Nbt long as long",
    "Nbt long as Long",
    "Nbt long As long",
    "Nbt long As Long",
    "Nbt Long as long",
    "Nbt Long as Long",
    "Nbt Long As long",
    "Nbt Long As Long",
    "NBT long as long",
    "NBT long as Long",
    "NBT long As long",
    "NBT long As Long",
    "NBT Long as long",
    "NBT Long as Long",
    "NBT Long As long",
    "NBT Long As Long",
    "nbt nbt long as long",
    "nbt nbt long as Long",
    "nbt nbt long As long",
    "nbt nbt long As Long",
    "nbt nbt Long as long",
    "nbt nbt Long as Long",
    "nbt nbt Long As long",
    "nbt nbt Long As Long",
    "nbt Nbt long as long",
    "nbt Nbt long as Long",
    "nbt Nbt long As long",
    "nbt Nbt long As Long",
    "nbt Nbt Long as long",
    "nbt Nbt Long as Long",
    "nbt Nbt Long As long",
    "nbt Nbt Long As Long",
    "Nbt nbt long as long",
    "Nbt nbt long as Long",
    "Nbt nbt long As long",
    "Nbt nbt long As Long",
    "Nbt nbt Long as long",
    "Nbt nbt Long as Long",
    "Nbt nbt Long As long",
    "Nbt nbt Long As Long",
    "Nbt Nbt long as long",
    "Nbt Nbt long as Long",
    "Nbt Nbt long As long",
    "Nbt Nbt long As Long",
    "Nbt Nbt Long as long",
    "Nbt Nbt Long as Long",
    "Nbt Nbt Long As long",
    "Nbt Nbt Long As Long",
    "nbt NBT long as long",
    "nbt NBT long as Long",
    "nbt NBT long As long",
    "nbt NBT long As Long",
    "nbt NBT Long as long",
    "nbt NBT Long as Long",
    "nbt NBT Long As long",
    "nbt NBT Long As Long",
    "Nbt NBT long as long",
    "Nbt NBT long as Long",
    "Nbt NBT long As long",
    "Nbt NBT long As Long",
    "Nbt NBT Long as long",
    "Nbt NBT Long as Long",
    "Nbt NBT Long As long",
    "Nbt NBT Long As Long",
    "NBT nbt long as long",
    "NBT nbt long as Long",
    "NBT nbt long As long",
    "NBT nbt long As Long",
    "NBT nbt Long as long",
    "NBT nbt Long as Long",
    "NBT nbt Long As long",
    "NBT nbt Long As Long",
    "NBT Nbt long as long",
    "NBT Nbt long as Long",
    "NBT Nbt long As long",
    "NBT Nbt long As Long",
    "NBT Nbt Long as long",
    "NBT Nbt Long as Long",
    "NBT Nbt Long As long",
    "NBT Nbt Long As Long",
    "NBT NBT long as long",
    "NBT NBT long as Long",
    "NBT NBT long As long",
    "NBT NBT long As Long",
    "NBT NBT Long as long",
    "NBT NBT Long as Long",
    "NBT NBT Long As long",
    "NBT NBT Long As Long",
  ];
  static override tooltipInfo =
    "Get the Long value of the given NBT Long tag" as const;

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
            type: "Long",
          },
        },
        normalizeSignature
      ),
      function: (nbt: LongTag): Long => {
        if (nbt.getType() === Tag.TAG_LONG) {
          return nbt.valueOf();
        } else {
          return Long.ZERO;
        }
      },
    });
  }
}
