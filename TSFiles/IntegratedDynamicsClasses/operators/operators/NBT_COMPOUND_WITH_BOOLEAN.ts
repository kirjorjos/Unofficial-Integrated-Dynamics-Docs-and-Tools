import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_BOOLEAN extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iBoolean, CompoundTag>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_compound_with_iBoolean",
      nicknames: ["nbtCompoundWithBoolean", "NBTWithBoolean"],
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
                type: "Boolean",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_iBoolean",
      interactName: "nbtWithBoolean",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<iBoolean, CompoundTag>> => {
        return (key: iString): TypeLambda<iBoolean, CompoundTag> => {
          return (value: iBoolean): CompoundTag => {
            return nbt.set(
              key.valueOf(),
              new ByteTag(new Integer(+value.valueOf()))
            );
          };
        };
      },
    });
  }
}
