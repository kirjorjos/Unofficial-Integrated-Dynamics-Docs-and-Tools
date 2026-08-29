import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_WITH_COMPOUND extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<CompoundTag, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_tag" as const;
  static override numericID = 236;
  static override nicknames = [
    "compoundWithTag",
    "nbtCompoundWithCompound",
    "nbtCompoundWithTag",
    "NBTWithNBT",
    "nbtWithTag",
    "compound_with_tag",
    "n_b_t_with_n_b_t",
    "nbt_compound_with_compound",
    "nbt_with_tag",
  ];
  static override symbol = "NBT{}.with_tag";
  static override interactName = "nbtWithTag";
  static override operatorName = "compound_with_tag" as const;
  static override displayName = "NBT Compound With NBT" as const;
  static override fullDisplayName = "NBT NBT Compound With NBT" as const;
  static override stringDisplayNames = [
    "nbt compound with nbt",
    "nbt compound with Nbt",
    "nbt compound With nbt",
    "nbt compound With Nbt",
    "nbt Compound with nbt",
    "nbt Compound with Nbt",
    "nbt Compound With nbt",
    "nbt Compound With Nbt",
    "Nbt compound with nbt",
    "Nbt compound with Nbt",
    "Nbt compound With nbt",
    "Nbt compound With Nbt",
    "Nbt Compound with nbt",
    "Nbt Compound with Nbt",
    "Nbt Compound With nbt",
    "Nbt Compound With Nbt",
    "nbt compound with NBT",
    "nbt compound With NBT",
    "nbt Compound with NBT",
    "nbt Compound With NBT",
    "Nbt compound with NBT",
    "Nbt compound With NBT",
    "Nbt Compound with NBT",
    "Nbt Compound With NBT",
    "NBT compound with nbt",
    "NBT compound with Nbt",
    "NBT compound With nbt",
    "NBT compound With Nbt",
    "NBT Compound with nbt",
    "NBT Compound with Nbt",
    "NBT Compound With nbt",
    "NBT Compound With Nbt",
    "NBT compound with NBT",
    "NBT compound With NBT",
    "NBT Compound with NBT",
    "NBT Compound With NBT",
    "nbt nbt compound with nbt",
    "nbt nbt compound with Nbt",
    "nbt nbt compound With nbt",
    "nbt nbt compound With Nbt",
    "nbt nbt Compound with nbt",
    "nbt nbt Compound with Nbt",
    "nbt nbt Compound With nbt",
    "nbt nbt Compound With Nbt",
    "nbt Nbt compound with nbt",
    "nbt Nbt compound with Nbt",
    "nbt Nbt compound With nbt",
    "nbt Nbt compound With Nbt",
    "nbt Nbt Compound with nbt",
    "nbt Nbt Compound with Nbt",
    "nbt Nbt Compound With nbt",
    "nbt Nbt Compound With Nbt",
    "Nbt nbt compound with nbt",
    "Nbt nbt compound with Nbt",
    "Nbt nbt compound With nbt",
    "Nbt nbt compound With Nbt",
    "Nbt nbt Compound with nbt",
    "Nbt nbt Compound with Nbt",
    "Nbt nbt Compound With nbt",
    "Nbt nbt Compound With Nbt",
    "Nbt Nbt compound with nbt",
    "Nbt Nbt compound with Nbt",
    "Nbt Nbt compound With nbt",
    "Nbt Nbt compound With Nbt",
    "Nbt Nbt Compound with nbt",
    "Nbt Nbt Compound with Nbt",
    "Nbt Nbt Compound With nbt",
    "Nbt Nbt Compound With Nbt",
    "nbt nbt compound with NBT",
    "nbt nbt compound With NBT",
    "nbt nbt Compound with NBT",
    "nbt nbt Compound With NBT",
    "nbt Nbt compound with NBT",
    "nbt Nbt compound With NBT",
    "nbt Nbt Compound with NBT",
    "nbt Nbt Compound With NBT",
    "Nbt nbt compound with NBT",
    "Nbt nbt compound With NBT",
    "Nbt nbt Compound with NBT",
    "Nbt nbt Compound With NBT",
    "Nbt Nbt compound with NBT",
    "Nbt Nbt compound With NBT",
    "Nbt Nbt Compound with NBT",
    "Nbt Nbt Compound With NBT",
    "nbt NBT compound with nbt",
    "nbt NBT compound with Nbt",
    "nbt NBT compound With nbt",
    "nbt NBT compound With Nbt",
    "nbt NBT Compound with nbt",
    "nbt NBT Compound with Nbt",
    "nbt NBT Compound With nbt",
    "nbt NBT Compound With Nbt",
    "Nbt NBT compound with nbt",
    "Nbt NBT compound with Nbt",
    "Nbt NBT compound With nbt",
    "Nbt NBT compound With Nbt",
    "Nbt NBT Compound with nbt",
    "Nbt NBT Compound with Nbt",
    "Nbt NBT Compound With nbt",
    "Nbt NBT Compound With Nbt",
    "nbt NBT compound with NBT",
    "nbt NBT compound With NBT",
    "nbt NBT Compound with NBT",
    "nbt NBT Compound With NBT",
    "Nbt NBT compound with NBT",
    "Nbt NBT compound With NBT",
    "Nbt NBT Compound with NBT",
    "Nbt NBT Compound With NBT",
    "NBT nbt compound with nbt",
    "NBT nbt compound with Nbt",
    "NBT nbt compound With nbt",
    "NBT nbt compound With Nbt",
    "NBT nbt Compound with nbt",
    "NBT nbt Compound with Nbt",
    "NBT nbt Compound With nbt",
    "NBT nbt Compound With Nbt",
    "NBT Nbt compound with nbt",
    "NBT Nbt compound with Nbt",
    "NBT Nbt compound With nbt",
    "NBT Nbt compound With Nbt",
    "NBT Nbt Compound with nbt",
    "NBT Nbt Compound with Nbt",
    "NBT Nbt Compound With nbt",
    "NBT Nbt Compound With Nbt",
    "NBT nbt compound with NBT",
    "NBT nbt compound With NBT",
    "NBT nbt Compound with NBT",
    "NBT nbt Compound With NBT",
    "NBT Nbt compound with NBT",
    "NBT Nbt compound With NBT",
    "NBT Nbt Compound with NBT",
    "NBT Nbt Compound With NBT",
    "NBT NBT compound with nbt",
    "NBT NBT compound with Nbt",
    "NBT NBT compound With nbt",
    "NBT NBT compound With Nbt",
    "NBT NBT Compound with nbt",
    "NBT NBT Compound with Nbt",
    "NBT NBT Compound With nbt",
    "NBT NBT Compound With Nbt",
    "NBT NBT compound with NBT",
    "NBT NBT compound With NBT",
    "NBT NBT Compound with NBT",
    "NBT NBT Compound With NBT",
  ];
  static override tooltipInfo =
    "Get a copy of the given NBT compound tag with the given NBT entry" as const;

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
                type: "NBT",
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
      ): TypeLambda<iString, TypeLambda<CompoundTag, CompoundTag>> => {
        return (key: iString): TypeLambda<CompoundTag, CompoundTag> => {
          return (value: CompoundTag): CompoundTag => {
            return nbt.set(key.valueOf(), value);
          };
        };
      },
    });
  }
}
