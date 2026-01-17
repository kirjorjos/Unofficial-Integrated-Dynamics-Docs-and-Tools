import { globalMap } from "HelperClasses/TypeMap";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_NBT_AS_BOOLEAN extends BaseOperator<ByteTag, iBoolean> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_as_iBoolean",
      nicknames: ["nbtAsBoolean"],
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
        globalMap
      ),
      symbol: "NBT.as_iBoolean",
      interactName: "nbtAsBoolean",
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
