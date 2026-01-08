import { TypeMap } from "HelperClasses/TypeMap";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_BYTE extends BaseOperator<Integer, IntTag> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_from_byte",
      nicknames: ["nbtFromByte"],
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
        globalMap
      ),
      symbol: "NBT.from_byte",
      interactName: "byteAsNbt",
      function: (byte: Integer): IntTag => {
        return new IntTag(byte);
      },
    });
  }
}
