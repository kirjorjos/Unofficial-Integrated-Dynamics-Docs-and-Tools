import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Double } from "JavaNumberClasses/Double";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_DOUBLE extends BaseOperator<
  CompoundTag,
  Operator<iString, Double>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_value_double",
      nicknames: ["nbtCompoundValueDouble", "compoundValueDouble"],
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
              type: "Double",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_double",
      interactName: "nbtGetDouble",
      function: (nbt: CompoundTag): TypeLambda<iString, Double> => {
        return (key: iString): Double => {
          let value = nbt.get(key);
          if (value.getType() === Tag.TAG_DOUBLE) {
            return value.valueOf() as Double;
          }
          throw new Error(
            `${key} is not a double in ${JSON.stringify(nbt.toJSON())}`
          );
        };
      },
    });
  }
}
