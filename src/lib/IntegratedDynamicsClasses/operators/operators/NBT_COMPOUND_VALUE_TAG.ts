import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_TAG extends BaseOperator<
  CompoundTag,
  Operator<iString, Tag<IntegratedValue>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_tag" as const;
  static override numericID = 224;
  static override nicknames = [
    "compoundValueAny",
    "compoundValueTag",
    "nbtCompoundValueTag",
    "nbtGetTag",
    "compound_value_any",
    "compound_value_tag",
    "nbt_compound_value_tag",
    "nbt_get_tag",
  ];
  static override symbol = "NBT{}.get_tag";
  static override interactName = "nbtGetTag";
  static override operatorName = "compound_value_tag" as const;
  static override displayName = "NBT Compound Value" as const;
  static override fullDisplayName = "NBT NBT Compound Value" as const;
  static override stringDisplayNames = [
    "nbt compound value",
    "nbt compound Value",
    "nbt Compound value",
    "nbt Compound Value",
    "Nbt compound value",
    "Nbt compound Value",
    "Nbt Compound value",
    "Nbt Compound Value",
    "NBT compound value",
    "NBT compound Value",
    "NBT Compound value",
    "NBT Compound Value",
    "nbt nbt compound value",
    "nbt nbt compound Value",
    "nbt nbt Compound value",
    "nbt nbt Compound Value",
    "nbt Nbt compound value",
    "nbt Nbt compound Value",
    "nbt Nbt Compound value",
    "nbt Nbt Compound Value",
    "Nbt nbt compound value",
    "Nbt nbt compound Value",
    "Nbt nbt Compound value",
    "Nbt nbt Compound Value",
    "Nbt Nbt compound value",
    "Nbt Nbt compound Value",
    "Nbt Nbt Compound value",
    "Nbt Nbt Compound Value",
    "nbt NBT compound value",
    "nbt NBT compound Value",
    "nbt NBT Compound value",
    "nbt NBT Compound Value",
    "Nbt NBT compound value",
    "Nbt NBT compound Value",
    "Nbt NBT Compound value",
    "Nbt NBT Compound Value",
    "NBT nbt compound value",
    "NBT nbt compound Value",
    "NBT nbt Compound value",
    "NBT nbt Compound Value",
    "NBT Nbt compound value",
    "NBT Nbt compound Value",
    "NBT Nbt Compound value",
    "NBT Nbt Compound Value",
    "NBT NBT compound value",
    "NBT NBT compound Value",
    "NBT NBT Compound value",
    "NBT NBT Compound Value",
  ];
  static override tooltipInfo =
    "The value of any type in the given NBT compound tag with the given key" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "INFIX_LONG" as const;
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
              type: "NBT",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, Tag<IntegratedValue>> => {
        return (key: iString): Tag<IntegratedValue> => {
          return nbt.get(key);
        };
      },
    });
  }
}
