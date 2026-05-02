import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ShortTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_WITH_SHORT extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<Integer, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_short" as const;
  static override numericID = 234;
  static override nicknames = [
    "compoundWithShort",
    "nbtCompoundWithShort",
    "nbtWithShort",
    "NBTWithShort",
    "compound_with_short",
    "n_b_t_with_short",
    "nbt_compound_with_short",
    "nbt_with_short",
  ];
  static override symbol = "NBT{}.with_short";
  static override interactName = "nbtWithShort";
  static override operatorName = "compound_with_short" as const;
  static override displayName = "NBT Compound With Short" as const;
  static override fullDisplayName = "NBT NBT Compound With Short" as const;
  static override tooltipInfo =
    "Get a copy of the given NBT compound tag with the given Integer as a short entry" as const;

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
            return nbt.set(key.valueOf(), new ShortTag(value));
          };
        };
      },
    });
  }
}
