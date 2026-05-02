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
