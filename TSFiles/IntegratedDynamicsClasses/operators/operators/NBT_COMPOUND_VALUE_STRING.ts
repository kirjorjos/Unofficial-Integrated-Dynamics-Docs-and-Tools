import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_STRING extends BaseOperator<
  CompoundTag,
  Operator<iString, iString>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_compound_value_string",
      nicknames: ["nbtCompoundValueString", "compoundValueString"],
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
              type: "String",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_string",
      interactName: "nbtGetString",
      function: (nbt: CompoundTag): TypeLambda<iString, iString> => {
        return (key: iString): iString => {
          let value = nbt.get(key);
          if (value.getType() === Tag.TAG_STRING) {
            return (value as StringTag).valueOf() as iString;
          }
          throw new Error(
            `${key} is not a string in ${JSON.stringify(nbt.toJSON())}`
          );
        };
      },
    });
  }
}
