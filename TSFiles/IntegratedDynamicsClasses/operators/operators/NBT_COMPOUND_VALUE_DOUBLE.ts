import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";
import { Double } from "JavaNumberClasses/Double";
import { DoubleTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { FloatTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

export class OPERATOR_NBT_COMPOUND_VALUE_DOUBLE extends BaseOperator<
  CompoundTag,
  Operator<iString, Double>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_double" as const;
  static override numericID = 216;
  static override nicknames = [
    "nbtGetDouble",
    "nbtCompoundValueDouble",
    "compoundValueDouble",
  ];
  static override symbol = "NBT{}.get_double";
  static override interactName = "nbtGetDouble";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (nbt: CompoundTag): TypeLambda<iString, Double> => {
        return (key: iString): Double => {
          let value = nbt.get(key);
          if (value instanceof DoubleTag || value instanceof FloatTag) {
            return (value as DoubleTag).valueOf();
          }
          if (value instanceof NullTag) {
            return new Double(0);
          }
          throw new Error(
            `${key.valueOf()} is not a double in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
