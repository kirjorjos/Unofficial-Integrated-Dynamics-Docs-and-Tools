import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Long } from "lib/JavaNumberClasses/Long";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_WITH_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<Long, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_long" as const;
  static override numericID = 233;
  static override nicknames = [
    "compoundWithLong",
    "nbtCompoundWithLong",
    "nbtWithLong",
    "NBTWithLong",
    "compound_with_long",
    "n_b_t_with_long",
    "nbt_compound_with_long",
    "nbt_with_long",
  ];
  static override symbol = "NBT{}.with_long";
  static override interactName = "nbtWithLong";
  static override operatorName = "compound_with_long" as const;
  static override displayName = "NBT Compound With Long" as const;
  static override fullDisplayName = "NBT NBT Compound With Long" as const;
  static override stringDisplayNames = [
    "nbt compound with long",
    "nbt compound with Long",
    "nbt compound With long",
    "nbt compound With Long",
    "nbt Compound with long",
    "nbt Compound with Long",
    "nbt Compound With long",
    "nbt Compound With Long",
    "Nbt compound with long",
    "Nbt compound with Long",
    "Nbt compound With long",
    "Nbt compound With Long",
    "Nbt Compound with long",
    "Nbt Compound with Long",
    "Nbt Compound With long",
    "Nbt Compound With Long",
    "NBT compound with long",
    "NBT compound with Long",
    "NBT compound With long",
    "NBT compound With Long",
    "NBT Compound with long",
    "NBT Compound with Long",
    "NBT Compound With long",
    "NBT Compound With Long",
    "nbt nbt compound with long",
    "nbt nbt compound with Long",
    "nbt nbt compound With long",
    "nbt nbt compound With Long",
    "nbt nbt Compound with long",
    "nbt nbt Compound with Long",
    "nbt nbt Compound With long",
    "nbt nbt Compound With Long",
    "nbt Nbt compound with long",
    "nbt Nbt compound with Long",
    "nbt Nbt compound With long",
    "nbt Nbt compound With Long",
    "nbt Nbt Compound with long",
    "nbt Nbt Compound with Long",
    "nbt Nbt Compound With long",
    "nbt Nbt Compound With Long",
    "Nbt nbt compound with long",
    "Nbt nbt compound with Long",
    "Nbt nbt compound With long",
    "Nbt nbt compound With Long",
    "Nbt nbt Compound with long",
    "Nbt nbt Compound with Long",
    "Nbt nbt Compound With long",
    "Nbt nbt Compound With Long",
    "Nbt Nbt compound with long",
    "Nbt Nbt compound with Long",
    "Nbt Nbt compound With long",
    "Nbt Nbt compound With Long",
    "Nbt Nbt Compound with long",
    "Nbt Nbt Compound with Long",
    "Nbt Nbt Compound With long",
    "Nbt Nbt Compound With Long",
    "nbt NBT compound with long",
    "nbt NBT compound with Long",
    "nbt NBT compound With long",
    "nbt NBT compound With Long",
    "nbt NBT Compound with long",
    "nbt NBT Compound with Long",
    "nbt NBT Compound With long",
    "nbt NBT Compound With Long",
    "Nbt NBT compound with long",
    "Nbt NBT compound with Long",
    "Nbt NBT compound With long",
    "Nbt NBT compound With Long",
    "Nbt NBT Compound with long",
    "Nbt NBT Compound with Long",
    "Nbt NBT Compound With long",
    "Nbt NBT Compound With Long",
    "NBT nbt compound with long",
    "NBT nbt compound with Long",
    "NBT nbt compound With long",
    "NBT nbt compound With Long",
    "NBT nbt Compound with long",
    "NBT nbt Compound with Long",
    "NBT nbt Compound With long",
    "NBT nbt Compound With Long",
    "NBT Nbt compound with long",
    "NBT Nbt compound with Long",
    "NBT Nbt compound With long",
    "NBT Nbt compound With Long",
    "NBT Nbt Compound with long",
    "NBT Nbt Compound with Long",
    "NBT Nbt Compound With long",
    "NBT Nbt Compound With Long",
    "NBT NBT compound with long",
    "NBT NBT compound with Long",
    "NBT NBT compound With long",
    "NBT NBT compound With Long",
    "NBT NBT Compound with long",
    "NBT NBT Compound with Long",
    "NBT NBT Compound With long",
    "NBT NBT Compound With Long",
  ];
  static override tooltipInfo =
    "Get a copy of the given NBT compound tag with the given Long entry" as const;

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
                type: "Long",
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
      ): TypeLambda<iString, TypeLambda<Long, CompoundTag>> => {
        return (key: iString): TypeLambda<Long, CompoundTag> => {
          return (value: Long): CompoundTag => {
            return nbt.set(key.valueOf(), new LongTag(value));
          };
        };
      },
    });
  }
}
