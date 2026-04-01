import { ByteArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_BYTE_LIST extends BaseOperator<
  iArray<Integer>,
  ByteArrayTag
> {
  static override internalName =
    "integrateddynamics:nbt_from_byte_list" as const;
  static override numericID = 255;
  static override nicknames = [
    "byteListAsNbt",
    "nbtFromByteList",
    "from_byte_list",
    "nbtFrom_byte_list",
  ];
  static override symbol = "NBT.from_byte_list";
  static override interactName = "byteListAsNbt";
  static override operatorName = "from_byte_list" as const;
  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
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
