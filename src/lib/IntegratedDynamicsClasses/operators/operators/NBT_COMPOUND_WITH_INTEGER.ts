import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_WITH_INTEGER extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<Integer, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_integer" as const;
  static override numericID = 228;
  static override nicknames = [
    "compoundWithInteger",
    "nbtCompoundWithInteger",
    "nbtWithInteger",
    "NBTWithInteger",
    "compound_with_integer",
    "n_b_t_with_integer",
    "nbt_compound_with_integer",
    "nbt_with_integer",
  ];
  static override symbol = "NBT{}.with_integer";
  static override interactName = "nbtWithInteger";
  static override operatorName = "compound_with_integer" as const;
  static override displayName = "NBT Compound With Integer" as const;
  static override fullDisplayName = "NBT NBT Compound With Integer" as const;
  static override stringDisplayNames = [
    "nbt compound with integer",
    "nbt compound with Integer",
    "nbt compound With integer",
    "nbt compound With Integer",
    "nbt Compound with integer",
    "nbt Compound with Integer",
    "nbt Compound With integer",
    "nbt Compound With Integer",
    "Nbt compound with integer",
    "Nbt compound with Integer",
    "Nbt compound With integer",
    "Nbt compound With Integer",
    "Nbt Compound with integer",
    "Nbt Compound with Integer",
    "Nbt Compound With integer",
    "Nbt Compound With Integer",
    "NBT compound with integer",
    "NBT compound with Integer",
    "NBT compound With integer",
    "NBT compound With Integer",
    "NBT Compound with integer",
    "NBT Compound with Integer",
    "NBT Compound With integer",
    "NBT Compound With Integer",
    "nbt nbt compound with integer",
    "nbt nbt compound with Integer",
    "nbt nbt compound With integer",
    "nbt nbt compound With Integer",
    "nbt nbt Compound with integer",
    "nbt nbt Compound with Integer",
    "nbt nbt Compound With integer",
    "nbt nbt Compound With Integer",
    "nbt Nbt compound with integer",
    "nbt Nbt compound with Integer",
    "nbt Nbt compound With integer",
    "nbt Nbt compound With Integer",
    "nbt Nbt Compound with integer",
    "nbt Nbt Compound with Integer",
    "nbt Nbt Compound With integer",
    "nbt Nbt Compound With Integer",
    "Nbt nbt compound with integer",
    "Nbt nbt compound with Integer",
    "Nbt nbt compound With integer",
    "Nbt nbt compound With Integer",
    "Nbt nbt Compound with integer",
    "Nbt nbt Compound with Integer",
    "Nbt nbt Compound With integer",
    "Nbt nbt Compound With Integer",
    "Nbt Nbt compound with integer",
    "Nbt Nbt compound with Integer",
    "Nbt Nbt compound With integer",
    "Nbt Nbt compound With Integer",
    "Nbt Nbt Compound with integer",
    "Nbt Nbt Compound with Integer",
    "Nbt Nbt Compound With integer",
    "Nbt Nbt Compound With Integer",
    "nbt NBT compound with integer",
    "nbt NBT compound with Integer",
    "nbt NBT compound With integer",
    "nbt NBT compound With Integer",
    "nbt NBT Compound with integer",
    "nbt NBT Compound with Integer",
    "nbt NBT Compound With integer",
    "nbt NBT Compound With Integer",
    "Nbt NBT compound with integer",
    "Nbt NBT compound with Integer",
    "Nbt NBT compound With integer",
    "Nbt NBT compound With Integer",
    "Nbt NBT Compound with integer",
    "Nbt NBT Compound with Integer",
    "Nbt NBT Compound With integer",
    "Nbt NBT Compound With Integer",
    "NBT nbt compound with integer",
    "NBT nbt compound with Integer",
    "NBT nbt compound With integer",
    "NBT nbt compound With Integer",
    "NBT nbt Compound with integer",
    "NBT nbt Compound with Integer",
    "NBT nbt Compound With integer",
    "NBT nbt Compound With Integer",
    "NBT Nbt compound with integer",
    "NBT Nbt compound with Integer",
    "NBT Nbt compound With integer",
    "NBT Nbt compound With Integer",
    "NBT Nbt Compound with integer",
    "NBT Nbt Compound with Integer",
    "NBT Nbt Compound With integer",
    "NBT Nbt Compound With Integer",
    "NBT NBT compound with integer",
    "NBT NBT compound with Integer",
    "NBT NBT compound With integer",
    "NBT NBT compound With Integer",
    "NBT NBT Compound with integer",
    "NBT NBT Compound with Integer",
    "NBT NBT Compound With integer",
    "NBT NBT Compound With Integer",
  ];
  static override tooltipInfo =
    "Get a copy of the given NBT compound tag with the given Integer entry" as const;

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
                type: "Integer",
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
      ): TypeLambda<iString, TypeLambda<Integer, CompoundTag>> => {
        return (key: iString): TypeLambda<Integer, CompoundTag> => {
          return (value: Integer): CompoundTag => {
            return nbt.set(key.valueOf(), new IntTag(value));
          };
        };
      },
    });
  }
}
