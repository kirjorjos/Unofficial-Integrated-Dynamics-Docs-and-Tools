import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_INTEGER extends BaseOperator<
  CompoundTag,
  Operator<iString, Integer>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_value_integer",
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
          if (value.getType() != Tag.TAG_INT)
            throw new Error(
              `${key} is not an integer in ${JSON.stringify(nbt.toJSON())}`
            );
          return (value as IntTag).valueOf();
        };
      },
    });
  }
}
