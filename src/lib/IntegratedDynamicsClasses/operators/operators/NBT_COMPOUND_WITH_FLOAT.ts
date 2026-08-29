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
  static override stringDisplayNames = [
    "nbt compound with float",
    "nbt compound with Float",
    "nbt compound With float",
    "nbt compound With Float",
    "nbt Compound with float",
    "nbt Compound with Float",
    "nbt Compound With float",
    "nbt Compound With Float",
    "Nbt compound with float",
    "Nbt compound with Float",
    "Nbt compound With float",
    "Nbt compound With Float",
    "Nbt Compound with float",
    "Nbt Compound with Float",
    "Nbt Compound With float",
    "Nbt Compound With Float",
    "NBT compound with float",
    "NBT compound with Float",
    "NBT compound With float",
    "NBT compound With Float",
    "NBT Compound with float",
    "NBT Compound with Float",
    "NBT Compound With float",
    "NBT Compound With Float",
    "nbt nbt compound with float",
    "nbt nbt compound with Float",
    "nbt nbt compound With float",
    "nbt nbt compound With Float",
    "nbt nbt Compound with float",
    "nbt nbt Compound with Float",
    "nbt nbt Compound With float",
    "nbt nbt Compound With Float",
    "nbt Nbt compound with float",
    "nbt Nbt compound with Float",
    "nbt Nbt compound With float",
    "nbt Nbt compound With Float",
    "nbt Nbt Compound with float",
    "nbt Nbt Compound with Float",
    "nbt Nbt Compound With float",
    "nbt Nbt Compound With Float",
    "Nbt nbt compound with float",
    "Nbt nbt compound with Float",
    "Nbt nbt compound With float",
    "Nbt nbt compound With Float",
    "Nbt nbt Compound with float",
    "Nbt nbt Compound with Float",
    "Nbt nbt Compound With float",
    "Nbt nbt Compound With Float",
    "Nbt Nbt compound with float",
    "Nbt Nbt compound with Float",
    "Nbt Nbt compound With float",
    "Nbt Nbt compound With Float",
    "Nbt Nbt Compound with float",
    "Nbt Nbt Compound with Float",
    "Nbt Nbt Compound With float",
    "Nbt Nbt Compound With Float",
    "nbt NBT compound with float",
    "nbt NBT compound with Float",
    "nbt NBT compound With float",
    "nbt NBT compound With Float",
    "nbt NBT Compound with float",
    "nbt NBT Compound with Float",
    "nbt NBT Compound With float",
    "nbt NBT Compound With Float",
    "Nbt NBT compound with float",
    "Nbt NBT compound with Float",
    "Nbt NBT compound With float",
    "Nbt NBT compound With Float",
    "Nbt NBT Compound with float",
    "Nbt NBT Compound with Float",
    "Nbt NBT Compound With float",
    "Nbt NBT Compound With Float",
    "NBT nbt compound with float",
    "NBT nbt compound with Float",
    "NBT nbt compound With float",
    "NBT nbt compound With Float",
    "NBT nbt Compound with float",
    "NBT nbt Compound with Float",
    "NBT nbt Compound With float",
    "NBT nbt Compound With Float",
    "NBT Nbt compound with float",
    "NBT Nbt compound with Float",
    "NBT Nbt compound With float",
    "NBT Nbt compound With Float",
    "NBT Nbt Compound with float",
    "NBT Nbt Compound with Float",
    "NBT Nbt Compound With float",
    "NBT Nbt Compound With Float",
    "NBT NBT compound with float",
    "NBT NBT compound with Float",
    "NBT NBT compound With float",
    "NBT NBT compound With Float",
    "NBT NBT Compound with float",
    "NBT NBT Compound with Float",
    "NBT NBT Compound With float",
    "NBT NBT Compound With Float",
  ];
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
