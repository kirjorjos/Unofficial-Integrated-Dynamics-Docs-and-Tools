import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Double } from "lib/JavaNumberClasses/Double";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_WITH_DOUBLE extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<Double, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_double" as const;
  static override numericID = 225;
  static override nicknames = [
    "nbtWithDouble",
    "nbtCompoundWithDouble",
    "NBTWithDouble",
    "compound_with_double",
    "nbtCompound_with_double",
  ];
  static override symbol = "NBT{}.with_double";
  static override interactName = "nbtWithDouble";
  static override operatorName = "compound_with_double" as const;
  static override kind = "nbt" as const;
  static override renderPattern = "INFIX_2_LONG" as const;
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
              type: "Function",
              from: {
                type: "Double",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<Double, CompoundTag>> => {
        return (key: iString): TypeLambda<Double, CompoundTag> => {
          return (value: Double): CompoundTag => {
            return nbt.set(key.valueOf(), new DoubleTag(value));
          };
        };
      },
    });
  }
}
