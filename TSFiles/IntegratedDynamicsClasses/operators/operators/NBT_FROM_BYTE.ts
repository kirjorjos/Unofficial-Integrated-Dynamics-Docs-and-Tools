import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";

export class OPERATOR_NBT_FROM_BYTE extends BaseOperator<Integer, ByteTag> {
  static override internalName = "integrateddynamics:nbt_from_byte" as const;
  static override nicknames = ["byteAsNbt", "nbtFromByte"];
  static override symbol = "NBT.from_byte";
  static override interactName = "byteAsNbt";
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
      function: (byte: Integer): ByteTag => {
        return new ByteTag(byte);
      },
    });
  }
}
