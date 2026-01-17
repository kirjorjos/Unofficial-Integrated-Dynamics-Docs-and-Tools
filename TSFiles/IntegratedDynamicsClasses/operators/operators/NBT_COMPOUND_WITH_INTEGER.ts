import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_INTEGER extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<Integer, CompoundTag>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_compound_with_integer",
      nicknames: ["nbtCompoundWithInteger", "NBTWithInteger"],
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
                type: "Integer",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_integer",
      interactName: "nbtWithInteger",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<Integer, CompoundTag>> => {
        return (key: iString): TypeLambda<Integer, CompoundTag> => {
          return (value: Integer): CompoundTag => {
            return nbt.set(key.valueOf(), new IntTag(value));
          };
        };
      },
    });
  }
}
