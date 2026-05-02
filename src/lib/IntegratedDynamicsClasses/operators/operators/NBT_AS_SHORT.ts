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
