import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { FloatTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Double } from "lib/JavaNumberClasses/Double";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_WITH_FLOAT extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<Double, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_float" as const;
  static override numericID = 226;
  static override nicknames = [
    "compoundWithFloat",
    "nbtCompoundWithFloat",
    "nbtWithFloat",
    "NBTWithFloat",
    "compound_with_float",
    "n_b_t_with_float",
    "nbt_compound_with_float",
    "nbt_with_float",
  ];
  static override symbol = "NBT{}.with_float";
  static override interactName = "nbtWithFloat";
  static override operatorName = "compound_with_float" as const;
  static override displayName = "NBT Compound With Float" as const;
  static override fullDisplayName = "NBT NBT Compound With Float" as const;
  static override tooltipInfo =
    "Get a copy of the given NBT compound tag with the given Double as a float entry" as const;

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
            return nbt.set(key.valueOf(), new FloatTag(value));
          };
        };
      },
    });
  }
}
