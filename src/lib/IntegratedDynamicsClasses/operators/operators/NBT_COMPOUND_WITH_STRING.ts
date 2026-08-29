import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_WITH_STRING extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iString, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_string" as const;
  static override numericID = 235;
  static override nicknames = [
    "compoundWithString",
    "nbtCompoundWithString",
    "nbtWithString",
    "NBTWithString",
    "compound_with_string",
    "n_b_t_with_string",
    "nbt_compound_with_string",
    "nbt_with_string",
  ];
  static override symbol = "NBT{}.with_string";
  static override interactName = "nbtWithString";
  static override operatorName = "compound_with_string" as const;
  static override displayName = "NBT Compound With String" as const;
  static override fullDisplayName = "NBT NBT Compound With String" as const;
  static override stringDisplayNames = [
    "nbt compound with string",
    "nbt compound with String",
    "nbt compound With string",
    "nbt compound With String",
    "nbt Compound with string",
    "nbt Compound with String",
    "nbt Compound With string",
    "nbt Compound With String",
    "Nbt compound with string",
    "Nbt compound with String",
    "Nbt compound With string",
    "Nbt compound With String",
    "Nbt Compound with string",
    "Nbt Compound with String",
    "Nbt Compound With string",
    "Nbt Compound With String",
    "NBT compound with string",
    "NBT compound with String",
    "NBT compound With string",
    "NBT compound With String",
    "NBT Compound with string",
    "NBT Compound with String",
    "NBT Compound With string",
    "NBT Compound With String",
    "nbt nbt compound with string",
    "nbt nbt compound with String",
    "nbt nbt compound With string",
    "nbt nbt compound With String",
    "nbt nbt Compound with string",
    "nbt nbt Compound with String",
    "nbt nbt Compound With string",
    "nbt nbt Compound With String",
    "nbt Nbt compound with string",
    "nbt Nbt compound with String",
    "nbt Nbt compound With string",
    "nbt Nbt compound With String",
    "nbt Nbt Compound with string",
    "nbt Nbt Compound with String",
    "nbt Nbt Compound With string",
    "nbt Nbt Compound With String",
    "Nbt nbt compound with string",
    "Nbt nbt compound with String",
    "Nbt nbt compound With string",
    "Nbt nbt compound With String",
    "Nbt nbt Compound with string",
    "Nbt nbt Compound with String",
    "Nbt nbt Compound With string",
    "Nbt nbt Compound With String",
    "Nbt Nbt compound with string",
    "Nbt Nbt compound with String",
    "Nbt Nbt compound With string",
    "Nbt Nbt compound With String",
    "Nbt Nbt Compound with string",
    "Nbt Nbt Compound with String",
    "Nbt Nbt Compound With string",
    "Nbt Nbt Compound With String",
    "nbt NBT compound with string",
    "nbt NBT compound with String",
    "nbt NBT compound With string",
    "nbt NBT compound With String",
    "nbt NBT Compound with string",
    "nbt NBT Compound with String",
    "nbt NBT Compound With string",
    "nbt NBT Compound With String",
    "Nbt NBT compound with string",
    "Nbt NBT compound with String",
    "Nbt NBT compound With string",
    "Nbt NBT compound With String",
    "Nbt NBT Compound with string",
    "Nbt NBT Compound with String",
    "Nbt NBT Compound With string",
    "Nbt NBT Compound With String",
    "NBT nbt compound with string",
    "NBT nbt compound with String",
    "NBT nbt compound With string",
    "NBT nbt compound With String",
    "NBT nbt Compound with string",
    "NBT nbt Compound with String",
    "NBT nbt Compound With string",
    "NBT nbt Compound With String",
    "NBT Nbt compound with string",
    "NBT Nbt compound with String",
    "NBT Nbt compound With string",
    "NBT Nbt compound With String",
    "NBT Nbt Compound with string",
    "NBT Nbt Compound with String",
    "NBT Nbt Compound With string",
    "NBT Nbt Compound With String",
    "NBT NBT compound with string",
    "NBT NBT compound with String",
    "NBT NBT compound With string",
    "NBT NBT compound With String",
    "NBT NBT Compound with string",
    "NBT NBT Compound with String",
    "NBT NBT Compound With string",
    "NBT NBT Compound With String",
  ];
  static override tooltipInfo =
    "Get a copy of the given NBT compound tag with the given String entry" as const;

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
                type: "String",
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
      ): TypeLambda<iString, TypeLambda<iString, CompoundTag>> => {
        return (key: iString): TypeLambda<iString, CompoundTag> => {
          return (value: iString): CompoundTag => {
            return nbt.set(key.valueOf(), new StringTag(value));
          };
        };
      },
    });
  }
}
