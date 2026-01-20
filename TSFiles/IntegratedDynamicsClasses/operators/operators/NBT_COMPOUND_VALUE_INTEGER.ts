import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";
import { Integer } from "JavaNumberClasses/Integer";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { ShortTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

export class OPERATOR_NBT_COMPOUND_VALUE_INTEGER extends BaseOperator<
  CompoundTag,
  Operator<iString, Integer>
> {
    static override internalName = "integrateddynamics:nbt_compound_value_integer"
  constructor() {
    super({
      nicknames: ["nbtCompoundValueInteger", "compoundValueInteger"],
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
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_integer",
      interactName: "nbtGetInteger",
      function: (nbt: CompoundTag): TypeLambda<iString, Integer> => {
        return (key: iString): Integer => {
          let value = nbt.get(key);
          if (
            value instanceof IntTag ||
            value instanceof ByteTag ||
            value instanceof ShortTag
          ) {
            return (value as IntTag).valueOf();
          }
          if (value instanceof NullTag) {
            return new Integer(0);
          }
          throw new Error(
            `${key.valueOf()} is not an integer in ${JSON.stringify(nbt.toJSON())}`
          );
        };
      },
    });
  }
}
