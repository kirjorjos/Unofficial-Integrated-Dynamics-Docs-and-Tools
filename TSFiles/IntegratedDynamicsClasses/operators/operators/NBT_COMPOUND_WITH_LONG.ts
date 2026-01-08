import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { LongTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Long } from "JavaNumberClasses/Long";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<Long, CompoundTag>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_with_long",
      nicknames: ["nbtCompoundWithLong", "NBTWithLong"],
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
              from: {
                type: "Long",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_long",
      interactName: "nbtWithLong",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<Long, CompoundTag>> => {
        return (key: iString): TypeLambda<Long, CompoundTag> => {
          return (value: Long): CompoundTag => {
            return nbt.set(key.valueOf(), new LongTag(value));
          };
        };
      },
    });
  }
}
