import { ByteArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_BYTE_LIST extends BaseOperator<
  iArray<Integer>,
  ByteArrayTag
> {
  static override internalName =
    "integrateddynamics:nbt_from_byte_list" as const;
  static override nicknames = ["byteListAsNbt", "nbtFromByteList"];
  static override symbol = "NBT.from_byte_list";
  static override interactName = "byteListAsNbt";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Integer" } },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (byteList: iArray<Integer>): ByteArrayTag => {
        return new ByteArrayTag(byteList);
      },
    });
  }
}
