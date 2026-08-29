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
    "compoundWithDouble",
    "nbtCompoundWithDouble",
    "nbtWithDouble",
    "NBTWithDouble",
    "compound_with_double",
    "n_b_t_with_double",
    "nbt_compound_with_double",
    "nbt_with_double",
  ];
  static override symbol = "NBT{}.with_double";
  static override interactName = "nbtWithDouble";
  static override operatorName = "compound_with_double" as const;
  static override displayName = "NBT Compound With Double" as const;
  static override fullDisplayName = "NBT NBT Compound With Double" as const;
  static override stringDisplayNames = [
    "nbt compound with double",
    "nbt compound with Double",
    "nbt compound With double",
    "nbt compound With Double",
    "nbt Compound with double",
    "nbt Compound with Double",
    "nbt Compound With double",
    "nbt Compound With Double",
    "Nbt compound with double",
    "Nbt compound with Double",
    "Nbt compound With double",
    "Nbt compound With Double",
    "Nbt Compound with double",
    "Nbt Compound with Double",
    "Nbt Compound With double",
    "Nbt Compound With Double",
    "NBT compound with double",
    "NBT compound with Double",
    "NBT compound With double",
    "NBT compound With Double",
    "NBT Compound with double",
    "NBT Compound with Double",
    "NBT Compound With double",
    "NBT Compound With Double",
    "nbt nbt compound with double",
    "nbt nbt compound with Double",
    "nbt nbt compound With double",
    "nbt nbt compound With Double",
    "nbt nbt Compound with double",
    "nbt nbt Compound with Double",
    "nbt nbt Compound With double",
    "nbt nbt Compound With Double",
    "nbt Nbt compound with double",
    "nbt Nbt compound with Double",
    "nbt Nbt compound With double",
    "nbt Nbt compound With Double",
    "nbt Nbt Compound with double",
    "nbt Nbt Compound with Double",
    "nbt Nbt Compound With double",
    "nbt Nbt Compound With Double",
    "Nbt nbt compound with double",
    "Nbt nbt compound with Double",
    "Nbt nbt compound With double",
    "Nbt nbt compound With Double",
    "Nbt nbt Compound with double",
    "Nbt nbt Compound with Double",
    "Nbt nbt Compound With double",
    "Nbt nbt Compound With Double",
    "Nbt Nbt compound with double",
    "Nbt Nbt compound with Double",
    "Nbt Nbt compound With double",
    "Nbt Nbt compound With Double",
    "Nbt Nbt Compound with double",
    "Nbt Nbt Compound with Double",
    "Nbt Nbt Compound With double",
    "Nbt Nbt Compound With Double",
    "nbt NBT compound with double",
    "nbt NBT compound with Double",
    "nbt NBT compound With double",
    "nbt NBT compound With Double",
    "nbt NBT Compound with double",
    "nbt NBT Compound with Double",
    "nbt NBT Compound With double",
    "nbt NBT Compound With Double",
    "Nbt NBT compound with double",
    "Nbt NBT compound with Double",
    "Nbt NBT compound With double",
    "Nbt NBT compound With Double",
    "Nbt NBT Compound with double",
    "Nbt NBT Compound with Double",
    "Nbt NBT Compound With double",
    "Nbt NBT Compound With Double",
    "NBT nbt compound with double",
    "NBT nbt compound with Double",
    "NBT nbt compound With double",
    "NBT nbt compound With Double",
    "NBT nbt Compound with double",
    "NBT nbt Compound with Double",
    "NBT nbt Compound With double",
    "NBT nbt Compound With Double",
    "NBT Nbt compound with double",
    "NBT Nbt compound with Double",
    "NBT Nbt compound With double",
    "NBT Nbt compound With Double",
    "NBT Nbt Compound with double",
    "NBT Nbt Compound with Double",
    "NBT Nbt Compound With double",
    "NBT Nbt Compound With Double",
    "NBT NBT compound with double",
    "NBT NBT compound with Double",
    "NBT NBT compound With double",
    "NBT NBT compound With Double",
    "NBT NBT Compound with double",
    "NBT NBT Compound with Double",
    "NBT NBT Compound With double",
    "NBT NBT Compound With Double",
  ];
  static override tooltipInfo =
    "Get a copy of the given NBT compound tag with the given Double entry" as const;

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
