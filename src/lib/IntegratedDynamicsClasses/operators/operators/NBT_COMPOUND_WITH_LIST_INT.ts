import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";

export class OPERATOR_NBT_COMPOUND_WITH_LIST_INT extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iArray<Integer>, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_list_int" as const;
  static override numericID = 230;
  static override nicknames = [
    "nbtWithIntList",
    "nbtCompoundWithListInt",
    "NBTWithIntegerList",
  ];
  static override symbol = "NBT{}.with_int_list";
  static override interactName = "nbtWithIntList";
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
              from: { type: "List", listType: { type: "Integer" } },
              to: {
                type: "NBT",
              },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<iArray<Integer>, CompoundTag>> => {
        return (key: iString): TypeLambda<iArray<Integer>, CompoundTag> => {
          return (value: iArray<Integer>): CompoundTag => {
            return nbt.set(key.valueOf(), new IntArrayTag(value));
          };
        };
      },
    });
  }
}
