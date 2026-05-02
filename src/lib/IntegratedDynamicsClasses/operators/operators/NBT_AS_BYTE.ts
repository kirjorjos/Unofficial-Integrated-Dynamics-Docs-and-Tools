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
