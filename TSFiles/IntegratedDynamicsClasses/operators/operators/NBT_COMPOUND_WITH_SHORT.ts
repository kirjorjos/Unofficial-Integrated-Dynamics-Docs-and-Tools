import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ShortTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_SHORT extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<Integer, CompoundTag>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_with_short",
      nicknames: ["nbtCompoundWithShort", "NBTWithShort"],
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
      symbol: "NBT{}.with_short",
      interactName: "nbtWithShort",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<Integer, CompoundTag>> => {
        return (key: iString): TypeLambda<Integer, CompoundTag> => {
          return (value: Integer): CompoundTag => {
            return nbt.set(key.valueOf(), new ShortTag(value));
          };
        };
      },
    });
  }
}
