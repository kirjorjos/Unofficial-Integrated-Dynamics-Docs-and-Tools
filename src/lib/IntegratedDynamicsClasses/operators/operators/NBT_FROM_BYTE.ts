import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";

export class OPERATOR_NBT_FROM_BYTE extends BaseOperator<Integer, ByteTag> {
  static override internalName = "integrateddynamics:nbt_from_byte" as const;
  static override numericID = 254;
  static override nicknames = [
    "byteAsNbt",
    "nbtFromByte",
    "from_byte",
    "nbtFrom_byte",
  ];
  static override symbol = "NBT.from_byte";
  static override interactName = "byteAsNbt";
  static override operatorName = "from_byte" as const;
  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
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
