import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { Double } from "lib/JavaNumberClasses/Double";
import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { FloatTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_NBT_COMPOUND_VALUE_DOUBLE extends BaseOperator<
  CompoundTag,
  Operator<iString, Double>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_double" as const;
  static override numericID = 216;
  static override nicknames = [
    "compoundValueDouble",
    "nbtCompoundValueDouble",
    "nbtGetDouble",
    "compound_value_double",
    "nbt_compound_value_double",
    "nbt_get_double",
  ];
  static override symbol = "NBT{}.get_double";
  static override interactName = "nbtGetDouble";
  static override operatorName = "compound_value_double" as const;
  static override displayName = "NBT Compound Value Double" as const;
  static override fullDisplayName = "NBT NBT Compound Value Double" as const;
  static override stringDisplayNames = [
    "nbt compound value double",
    "nbt compound value Double",
    "nbt compound Value double",
    "nbt compound Value Double",
    "nbt Compound value double",
    "nbt Compound value Double",
    "nbt Compound Value double",
    "nbt Compound Value Double",
    "Nbt compound value double",
    "Nbt compound value Double",
    "Nbt compound Value double",
    "Nbt compound Value Double",
    "Nbt Compound value double",
    "Nbt Compound value Double",
    "Nbt Compound Value double",
    "Nbt Compound Value Double",
    "NBT compound value double",
    "NBT compound value Double",
    "NBT compound Value double",
    "NBT compound Value Double",
    "NBT Compound value double",
    "NBT Compound value Double",
    "NBT Compound Value double",
    "NBT Compound Value Double",
    "nbt nbt compound value double",
    "nbt nbt compound value Double",
    "nbt nbt compound Value double",
    "nbt nbt compound Value Double",
    "nbt nbt Compound value double",
    "nbt nbt Compound value Double",
    "nbt nbt Compound Value double",
    "nbt nbt Compound Value Double",
    "nbt Nbt compound value double",
    "nbt Nbt compound value Double",
    "nbt Nbt compound Value double",
    "nbt Nbt compound Value Double",
    "nbt Nbt Compound value double",
    "nbt Nbt Compound value Double",
    "nbt Nbt Compound Value double",
    "nbt Nbt Compound Value Double",
    "Nbt nbt compound value double",
    "Nbt nbt compound value Double",
    "Nbt nbt compound Value double",
    "Nbt nbt compound Value Double",
    "Nbt nbt Compound value double",
    "Nbt nbt Compound value Double",
    "Nbt nbt Compound Value double",
    "Nbt nbt Compound Value Double",
    "Nbt Nbt compound value double",
    "Nbt Nbt compound value Double",
    "Nbt Nbt compound Value double",
    "Nbt Nbt compound Value Double",
    "Nbt Nbt Compound value double",
    "Nbt Nbt Compound value Double",
    "Nbt Nbt Compound Value double",
    "Nbt Nbt Compound Value Double",
    "nbt NBT compound value double",
    "nbt NBT compound value Double",
    "nbt NBT compound Value double",
    "nbt NBT compound Value Double",
    "nbt NBT Compound value double",
    "nbt NBT Compound value Double",
    "nbt NBT Compound Value double",
    "nbt NBT Compound Value Double",
    "Nbt NBT compound value double",
    "Nbt NBT compound value Double",
    "Nbt NBT compound Value double",
    "Nbt NBT compound Value Double",
    "Nbt NBT Compound value double",
    "Nbt NBT Compound value Double",
    "Nbt NBT Compound Value double",
    "Nbt NBT Compound Value Double",
    "NBT nbt compound value double",
    "NBT nbt compound value Double",
    "NBT nbt compound Value double",
    "NBT nbt compound Value Double",
    "NBT nbt Compound value double",
    "NBT nbt Compound value Double",
    "NBT nbt Compound Value double",
    "NBT nbt Compound Value Double",
    "NBT Nbt compound value double",
    "NBT Nbt compound value Double",
    "NBT Nbt compound Value double",
    "NBT Nbt compound Value Double",
    "NBT Nbt Compound value double",
    "NBT Nbt Compound value Double",
    "NBT Nbt Compound Value double",
    "NBT Nbt Compound Value Double",
    "NBT NBT compound value double",
    "NBT NBT compound value Double",
    "NBT NBT compound Value double",
    "NBT NBT compound Value Double",
    "NBT NBT Compound value double",
    "NBT NBT Compound value Double",
    "NBT NBT Compound Value double",
    "NBT NBT Compound Value Double",
  ];
  static override tooltipInfo =
    "The Double value in the given NBT compound tag with the given key" as const;

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
          throw new iError(
            `${key.valueOf()} is not a double in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
