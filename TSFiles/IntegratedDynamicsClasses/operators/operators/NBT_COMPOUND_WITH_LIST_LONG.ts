import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Long } from "JavaNumberClasses/Long";
import { LongArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongArrayTag";

export class OPERATOR_NBT_COMPOUND_WITH_LIST_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iArray<Long>, CompoundTag>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_compound_with_list_long",
      nicknames: ["nbtCompoundWithListLong", "NBTWithLongList"],
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
        globalMap
      ),
      symbol: "NBT{}.with_long_list",
      interactName: "nbtWithLongList",
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
