import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Long } from "JavaNumberClasses/Long";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, Long>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_value_long",
      nicknames: ["nbtCompoundValueLong", "compoundValueLong"],
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
              type: "Long",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_long",
      interactName: "nbtGetLong",
      function: (nbt: CompoundTag): TypeLambda<iString, Long> => {
        return (key: iString): Long => {
          let value = nbt.get(key);
          if (value.getType() === Tag.TAG_LONG) {
            return value.valueOf() as Long;
          }
          throw new Error(
            `${key} is not a long in ${JSON.stringify(nbt.toJSON())}`
          );
        };
      },
    });
  }
}
