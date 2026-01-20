import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";
import { ByteArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";

export class OPERATOR_NBT_COMPOUND_WITH_LIST_BYTE extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iArray<Integer>, CompoundTag>>
> {
    static override internalName = "integrateddynamics:nbt_compound_with_list_byte"
  constructor() {
    super({
      nicknames: ["nbtCompoundWithListByte", "NBTWithByteList"],
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
        globalMap
      ),
      symbol: "NBT{}.with_byte_list",
      interactName: "nbtWithByteList",
      function:
        (
          nbt: CompoundTag
        ): TypeLambda<iString, TypeLambda<iArray<Integer>, CompoundTag>> =>
        (key: iString): TypeLambda<iArray<Integer>, CompoundTag> =>
        (value: iArray<Integer>): CompoundTag => {
          return nbt.set(key.valueOf(), new ByteArrayTag(value));
        },
    });
  }
}
