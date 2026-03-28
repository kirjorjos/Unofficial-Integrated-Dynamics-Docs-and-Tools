import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";

export class OPERATOR_NBT_FROM_BYTE extends BaseOperator<Integer, ByteTag> {
  static override internalName = "integrateddynamics:nbt_from_byte" as const;
  static override numericID = 254;
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
