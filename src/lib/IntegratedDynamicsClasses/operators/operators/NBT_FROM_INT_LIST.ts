import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_INT_LIST extends BaseOperator<
  iArray<Integer>,
  IntArrayTag
> {
  static override internalName =
    "integrateddynamics:nbt_from_int_list" as const;
  static override numericID = 260;
  static override nicknames = ["intListAsNbt", "nbtFromIntList"];
  static override symbol = "NBT.from_int_list";
  static override interactName = "intListAsNbt";
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
      function: (intList: iArray<Integer>): IntArrayTag => {
        return new IntArrayTag(intList);
      },
    });
  }
}
