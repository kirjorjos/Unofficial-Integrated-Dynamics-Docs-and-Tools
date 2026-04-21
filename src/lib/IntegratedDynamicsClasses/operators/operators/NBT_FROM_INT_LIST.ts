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
  static override nicknames = [
    "fromIntList",
    "intListAsNbt",
    "nbtFromIntList",
    "from_int_list",
    "int_list_as_nbt",
    "nbt_from_int_list",
    "nbtFrom_int_list",
  ];
  static override symbol = "NBT.from_int_list";
  static override interactName = "intListAsNbt";
  static override operatorName = "from_int_list" as const;
  static override displayName = "NBT Integer Array From Integer List" as const;
  static override fullDisplayName =
    "NBT NBT Integer Array From Integer List" as const;
  static override tooltipInfo =
    "Create an NBT Integer Array tag from the given Integer List value" as const;

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
      function: (intList: iArray<Integer>): IntArrayTag => {
        return new IntArrayTag(intList);
      },
    });
  }
}
