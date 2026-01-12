import { TypeMap } from "HelperClasses/TypeMap";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_BYTE extends BaseOperator<ByteTag, Integer> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_as_byte",
      nicknames: ["nbtAsByte"],
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
        globalMap
      ),
      symbol: "NBT.as_byte",
      interactName: "nbtAsByte",
      function: (nbt: ByteTag): Integer => {
        if (nbt.getType() === Tag.TAG_INT) {
          return nbt.valueOf();
        } else {
          return Integer.ZERO;
        }
      },
    });
  }
}
