import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_NBT_AS_BOOLEAN extends BaseOperator<ByteTag, iBoolean> {
  static override internalName = "integrateddynamics:nbt_as_iBoolean" as const;
  static override numericID = 246;
  static override nicknames = ["nbtAsBoolean"];
  static override symbol = "NBT.as_iBoolean";
  static override interactName = "nbtAsBoolean";
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
