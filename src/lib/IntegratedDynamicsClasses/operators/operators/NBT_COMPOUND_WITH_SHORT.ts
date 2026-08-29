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
  static override stringDisplayNames = [
    "nbt compound with short",
    "nbt compound with Short",
    "nbt compound With short",
    "nbt compound With Short",
    "nbt Compound with short",
    "nbt Compound with Short",
    "nbt Compound With short",
    "nbt Compound With Short",
    "Nbt compound with short",
    "Nbt compound with Short",
    "Nbt compound With short",
    "Nbt compound With Short",
    "Nbt Compound with short",
    "Nbt Compound with Short",
    "Nbt Compound With short",
    "Nbt Compound With Short",
    "NBT compound with short",
    "NBT compound with Short",
    "NBT compound With short",
    "NBT compound With Short",
    "NBT Compound with short",
    "NBT Compound with Short",
    "NBT Compound With short",
    "NBT Compound With Short",
    "nbt nbt compound with short",
    "nbt nbt compound with Short",
    "nbt nbt compound With short",
    "nbt nbt compound With Short",
    "nbt nbt Compound with short",
    "nbt nbt Compound with Short",
    "nbt nbt Compound With short",
    "nbt nbt Compound With Short",
    "nbt Nbt compound with short",
    "nbt Nbt compound with Short",
    "nbt Nbt compound With short",
    "nbt Nbt compound With Short",
    "nbt Nbt Compound with short",
    "nbt Nbt Compound with Short",
    "nbt Nbt Compound With short",
    "nbt Nbt Compound With Short",
    "Nbt nbt compound with short",
    "Nbt nbt compound with Short",
    "Nbt nbt compound With short",
    "Nbt nbt compound With Short",
    "Nbt nbt Compound with short",
    "Nbt nbt Compound with Short",
    "Nbt nbt Compound With short",
    "Nbt nbt Compound With Short",
    "Nbt Nbt compound with short",
    "Nbt Nbt compound with Short",
    "Nbt Nbt compound With short",
    "Nbt Nbt compound With Short",
    "Nbt Nbt Compound with short",
    "Nbt Nbt Compound with Short",
    "Nbt Nbt Compound With short",
    "Nbt Nbt Compound With Short",
    "nbt NBT compound with short",
    "nbt NBT compound with Short",
    "nbt NBT compound With short",
    "nbt NBT compound With Short",
    "nbt NBT Compound with short",
    "nbt NBT Compound with Short",
    "nbt NBT Compound With short",
    "nbt NBT Compound With Short",
    "Nbt NBT compound with short",
    "Nbt NBT compound with Short",
    "Nbt NBT compound With short",
    "Nbt NBT compound With Short",
    "Nbt NBT Compound with short",
    "Nbt NBT Compound with Short",
    "Nbt NBT Compound With short",
    "Nbt NBT Compound With Short",
    "NBT nbt compound with short",
    "NBT nbt compound with Short",
    "NBT nbt compound With short",
    "NBT nbt compound With Short",
    "NBT nbt Compound with short",
    "NBT nbt Compound with Short",
    "NBT nbt Compound With short",
    "NBT nbt Compound With Short",
    "NBT Nbt compound with short",
    "NBT Nbt compound with Short",
    "NBT Nbt compound With short",
    "NBT Nbt compound With Short",
    "NBT Nbt Compound with short",
    "NBT Nbt Compound with Short",
    "NBT Nbt Compound With short",
    "NBT Nbt Compound With Short",
    "NBT NBT compound with short",
    "NBT NBT compound with Short",
    "NBT NBT compound With short",
    "NBT NBT compound With Short",
    "NBT NBT Compound with short",
    "NBT NBT Compound with Short",
    "NBT NBT Compound With short",
    "NBT NBT Compound With Short",
  ];
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
