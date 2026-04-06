import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_NBT_AS_BOOLEAN extends BaseOperator<ByteTag, iBoolean> {
  static override internalName = "integrateddynamics:nbt_as_iBoolean" as const;
  static override numericID = 246;
  static override nicknames = ["nbtAsBoolean", "as_boolean", "nbtAs_boolean"];
  static override symbol = "NBT.as_iBoolean";
  static override interactName = "nbtAsBoolean";
  static override operatorName = "as_boolean" as const;
  static override displayName = "NBT Boolean As Boolean" as const;
  static override fullDisplayName = "NBT NBT Boolean As Boolean" as const;
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
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (nbt: ByteTag): iBoolean => {
        if (nbt.getType() === Tag.TAG_BYTE) {
          return new iBoolean(!!nbt.valueOf().toJSNumber());
        } else {
          return new iBoolean(false);
        }
      },
    });
  }
}
