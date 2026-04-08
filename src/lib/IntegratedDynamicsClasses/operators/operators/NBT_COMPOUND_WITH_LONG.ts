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
    "nbtWithLong",
    "nbtCompoundWithLong",
    "NBTWithLong",
    "compound_with_long",
    "nbtCompound_with_long",
  ];
  static override symbol = "NBT{}.with_long";
  static override interactName = "nbtWithLong";
  static override operatorName = "compound_with_long" as const;
  static override displayName = "NBT Compound With Long" as const;
  static override fullDisplayName = "NBT NBT Compound With Long" as const;
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
