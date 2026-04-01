import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Long } from "lib/JavaNumberClasses/Long";
import { LongArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongArrayTag";

export class OPERATOR_NBT_COMPOUND_WITH_LIST_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iArray<Long>, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_list_long" as const;
  static override numericID = 231;
  static override nicknames = [
    "nbtWithLongList",
    "nbtCompoundWithListLong",
    "NBTWithLongList",
    "compound_with_list_long",
    "nbtCompound_with_list_long",
  ];
  static override symbol = "NBT{}.with_long_list";
  static override interactName = "nbtWithLongList";
  static override operatorName = "compound_with_list_long" as const;
  static override kind = "nbt" as const;
  static override renderPattern = "INFIX_2_VERYLONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Long" } },
              to: {
                type: "NBT",
              },
            },
          },
        },
        normalizeSignature
      ),
      function:
        (
          nbt: CompoundTag
        ): TypeLambda<iString, TypeLambda<iArray<Long>, CompoundTag>> =>
        (key: iString): TypeLambda<iArray<Long>, CompoundTag> =>
        (value: iArray<Long>): CompoundTag => {
          return nbt.set(key.valueOf(), new LongArrayTag(value));
        },
    });
  }
}
