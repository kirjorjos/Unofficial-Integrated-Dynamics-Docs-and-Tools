import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_STRING extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iString, CompoundTag>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_with_string",
      nicknames: ["nbtCompoundWithString", "NBTWithString"],
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
                type: "String",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_string",
      interactName: "nbtWithString",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<iString, CompoundTag>> => {
        return (key: iString): TypeLambda<iString, CompoundTag> => {
          return (value: iString): CompoundTag => {
            return nbt.set(key.valueOf(), new StringTag(value));
          };
        };
      },
    });
  }
}
