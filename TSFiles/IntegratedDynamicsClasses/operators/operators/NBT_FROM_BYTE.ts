import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";

export class OPERATOR_NBT_FROM_BYTE extends BaseOperator<Integer, ByteTag> {
  static override internalName = "integrateddynamics:nbt_from_byte" as const;
  constructor() {
    super({
      nicknames: ["nbtFromByte"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Integer",
        },
        to: {
          type: "NBT",
        },
      }),
      symbol: "NBT.from_byte",
      interactName: "byteAsNbt",
      function: (byte: Integer): ByteTag => {
        return new ByteTag(byte);
      },
    });
  }
}
