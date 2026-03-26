import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";
import { IntArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";

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
