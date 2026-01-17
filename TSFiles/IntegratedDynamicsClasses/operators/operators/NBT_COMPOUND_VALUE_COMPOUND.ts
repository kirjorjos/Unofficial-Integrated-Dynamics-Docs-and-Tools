import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_COMPOUND extends BaseOperator<
  CompoundTag,
  Operator<iString, Tag<IntegratedValue>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_compound_value_compound",
      nicknames: ["nbtCompoundValueCompound", "compoundValueNBT"],
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
              type: "NBT",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_compound",
      interactName: "nbtGetCompound",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, Tag<IntegratedValue>> => {
        return (key: iString): Tag<IntegratedValue> => {
          let value = nbt.get(key);
          if (value.getType() === Tag.TAG_COMPOUND) {
            return value;
          }
          throw new Error(
            `${key} is not a Compound in ${JSON.stringify(nbt.toJSON())}`
          );
        };
      },
    });
  }
}
