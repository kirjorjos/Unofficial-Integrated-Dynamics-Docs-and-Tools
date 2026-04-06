import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { Double } from "lib/JavaNumberClasses/Double";
import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { FloatTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

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
    "compound_value_double",
    "nbtCompound_value_double",
  ];
  static override symbol = "NBT{}.get_double";
  static override interactName = "nbtGetDouble";
  static override operatorName = "compound_value_double" as const;
  static override displayName = "NBT Compound Value Double" as const;
  static override fullDisplayName = "NBT NBT Compound Value Double" as const;
  static override kind = "nbt" as const;
  static override renderPattern = "INFIX_LONG" as const;
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
