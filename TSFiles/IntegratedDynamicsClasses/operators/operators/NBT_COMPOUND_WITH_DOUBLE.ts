import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { DoubleTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Double } from "JavaNumberClasses/Double";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_DOUBLE extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<Double, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_double" as const;
  static override nicknames = [
    "nbtWithDouble",
    "nbtCompoundWithDouble",
    "NBTWithDouble",
  ];
  static override symbol = "NBT{}.with_double";
  static override interactName = "nbtWithDouble";
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
