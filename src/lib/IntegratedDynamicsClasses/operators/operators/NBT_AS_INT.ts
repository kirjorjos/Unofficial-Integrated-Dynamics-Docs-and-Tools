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
