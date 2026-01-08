import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_TAG extends BaseOperator<
  CompoundTag,
  Operator<iString, Tag<IntegratedValue>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_value_tag",
      nicknames: ["nbtCompoundValueTag", "compoundValueAny"],
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
      symbol: "NBT{}.get_tag",
      interactName: "nbtGetTag",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, Tag<IntegratedValue>> => {
        return (key: iString): Tag<IntegratedValue> => {
          return nbt.get(key);
        };
      },
    });
  }
}
