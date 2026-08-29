import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_SUBSET extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, iBoolean>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_subset" as const;
  static override numericID = 212;
  static override nicknames = [
    "compoundSubset",
    "nbtCompoundSubset",
    "nbtIsSubset",
    "NBTSubset",
    "compound_subset",
    "nbt_compound_subset",
    "nbt_is_subset",
  ];
  static override symbol = "NBT{}.⊆";
  static override interactName = "nbtIsSubset";
  static override operatorName = "compound_subset" as const;
  static override displayName = "NBT Compound Subset" as const;
  static override fullDisplayName = "NBT NBT Compound Subset" as const;
  static override stringDisplayNames = [
    "nbt compound subset",
    "nbt compound Subset",
    "nbt Compound subset",
    "nbt Compound Subset",
    "Nbt compound subset",
    "Nbt compound Subset",
    "Nbt Compound subset",
    "Nbt Compound Subset",
    "NBT compound subset",
    "NBT compound Subset",
    "NBT Compound subset",
    "NBT Compound Subset",
    "nbt nbt compound subset",
    "nbt nbt compound Subset",
    "nbt nbt Compound subset",
    "nbt nbt Compound Subset",
    "nbt Nbt compound subset",
    "nbt Nbt compound Subset",
    "nbt Nbt Compound subset",
    "nbt Nbt Compound Subset",
    "Nbt nbt compound subset",
    "Nbt nbt compound Subset",
    "Nbt nbt Compound subset",
    "Nbt nbt Compound Subset",
    "Nbt Nbt compound subset",
    "Nbt Nbt compound Subset",
    "Nbt Nbt Compound subset",
    "Nbt Nbt Compound Subset",
    "nbt NBT compound subset",
    "nbt NBT compound Subset",
    "nbt NBT Compound subset",
    "nbt NBT Compound Subset",
    "Nbt NBT compound subset",
    "Nbt NBT compound Subset",
    "Nbt NBT Compound subset",
    "Nbt NBT Compound Subset",
    "NBT nbt compound subset",
    "NBT nbt compound Subset",
    "NBT nbt Compound subset",
    "NBT nbt Compound Subset",
    "NBT Nbt compound subset",
    "NBT Nbt compound Subset",
    "NBT Nbt Compound subset",
    "NBT Nbt Compound Subset",
    "NBT NBT compound subset",
    "NBT NBT compound Subset",
    "NBT NBT Compound subset",
    "NBT NBT Compound Subset",
  ];
  static override tooltipInfo =
    "If the first NBT compound tag is a subset of, or equal to the second NBT compound tag. This will recursively check nested tags." as const;

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
              type: "NBT",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (subSet: CompoundTag): TypeLambda<CompoundTag, iBoolean> => {
        return (superSet: CompoundTag): iBoolean => {
          return new iBoolean(superSet.compoundSubset(subSet));
        };
      },
    });
  }
}
