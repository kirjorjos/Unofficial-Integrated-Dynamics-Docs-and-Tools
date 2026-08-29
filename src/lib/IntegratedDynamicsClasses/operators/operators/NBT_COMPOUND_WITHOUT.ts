import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_WITHOUT extends BaseOperator<
  CompoundTag,
  Operator<iString, CompoundTag>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_without" as const;
  static override numericID = 237;
  static override nicknames = [
    "compoundWithout",
    "nbtCompoundWithout",
    "nbtWithout",
    "NBTWithout",
    "compound_without",
    "nbt_compound_without",
    "nbt_without",
  ];
  static override symbol = "NBT{}.without";
  static override interactName = "nbtWithout";
  static override operatorName = "compound_without" as const;
  static override displayName = "NBT Compound Without" as const;
  static override fullDisplayName = "NBT NBT Compound Without" as const;
  static override stringDisplayNames = [
    "nbt compound without",
    "nbt compound Without",
    "nbt Compound without",
    "nbt Compound Without",
    "Nbt compound without",
    "Nbt compound Without",
    "Nbt Compound without",
    "Nbt Compound Without",
    "NBT compound without",
    "NBT compound Without",
    "NBT Compound without",
    "NBT Compound Without",
    "nbt nbt compound without",
    "nbt nbt compound Without",
    "nbt nbt Compound without",
    "nbt nbt Compound Without",
    "nbt Nbt compound without",
    "nbt Nbt compound Without",
    "nbt Nbt Compound without",
    "nbt Nbt Compound Without",
    "Nbt nbt compound without",
    "Nbt nbt compound Without",
    "Nbt nbt Compound without",
    "Nbt nbt Compound Without",
    "Nbt Nbt compound without",
    "Nbt Nbt compound Without",
    "Nbt Nbt Compound without",
    "Nbt Nbt Compound Without",
    "nbt NBT compound without",
    "nbt NBT compound Without",
    "nbt NBT Compound without",
    "nbt NBT Compound Without",
    "Nbt NBT compound without",
    "Nbt NBT compound Without",
    "Nbt NBT Compound without",
    "Nbt NBT Compound Without",
    "NBT nbt compound without",
    "NBT nbt compound Without",
    "NBT nbt Compound without",
    "NBT nbt Compound Without",
    "NBT Nbt compound without",
    "NBT Nbt compound Without",
    "NBT Nbt Compound without",
    "NBT Nbt Compound Without",
    "NBT NBT compound without",
    "NBT NBT compound Without",
    "NBT NBT Compound without",
    "NBT NBT Compound Without",
  ];
  static override tooltipInfo =
    "Get a copy of the given NBT compound tag without the given key" as const;

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
      function: (nbt: CompoundTag): TypeLambda<iString, CompoundTag> => {
        return (key: iString): CompoundTag => {
          return nbt.without(key.valueOf());
        };
      },
    });
  }
}
