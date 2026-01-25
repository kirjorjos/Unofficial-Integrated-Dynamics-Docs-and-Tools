import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_BYTE extends BaseOperator<ByteTag, Integer> {
  static override internalName = "integrateddynamics:nbt_as_byte" as const;
  constructor() {
    super({
      nicknames: ["nbtAsByte"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "NBT",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "NBT.as_byte",
      interactName: "nbtAsByte",
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
