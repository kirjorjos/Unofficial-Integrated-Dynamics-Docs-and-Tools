import { ByteArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_BYTE_LIST extends BaseOperator<
  iArray<Integer>,
  ByteArrayTag
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_from_byte_list",
      nicknames: ["nbtFromByteList"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Integer" } },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_byte_list",
      interactName: "byteListAsNbt",
      function: (byteList: iArray<Integer>): ByteArrayTag => {
        return new ByteArrayTag(byteList);
      },
    });
  }
}
