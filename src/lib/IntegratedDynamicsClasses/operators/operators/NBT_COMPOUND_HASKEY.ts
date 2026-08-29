import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_HASKEY extends BaseOperator<
  CompoundTag,
  Operator<iString, iBoolean>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_haskey" as const;
  static override numericID = 207;
  static override nicknames = [
    "compoundHasKey",
    "nbtCompoundHasKey",
    "nbtHasKey",
    "NBTHasKey",
    "compound_has_key",
    "n_b_t_has_key",
    "nbt_compound_has_key",
    "nbt_has_key",
  ];
  static override symbol = "NBT{}.has_key";
  static override interactName = "nbtHasKey";
  static override operatorName = "compound_haskey" as const;
  static override displayName = "NBT Compound Has Key" as const;
  static override fullDisplayName = "NBT NBT Compound Has Key" as const;
  static override stringDisplayNames = [
    "nbt compound has key",
    "nbt compound has Key",
    "nbt compound Has key",
    "nbt compound Has Key",
    "nbt Compound has key",
    "nbt Compound has Key",
    "nbt Compound Has key",
    "nbt Compound Has Key",
    "Nbt compound has key",
    "Nbt compound has Key",
    "Nbt compound Has key",
    "Nbt compound Has Key",
    "Nbt Compound has key",
    "Nbt Compound has Key",
    "Nbt Compound Has key",
    "Nbt Compound Has Key",
    "NBT compound has key",
    "NBT compound has Key",
    "NBT compound Has key",
    "NBT compound Has Key",
    "NBT Compound has key",
    "NBT Compound has Key",
    "NBT Compound Has key",
    "NBT Compound Has Key",
    "nbt nbt compound has key",
    "nbt nbt compound has Key",
    "nbt nbt compound Has key",
    "nbt nbt compound Has Key",
    "nbt nbt Compound has key",
    "nbt nbt Compound has Key",
    "nbt nbt Compound Has key",
    "nbt nbt Compound Has Key",
    "nbt Nbt compound has key",
    "nbt Nbt compound has Key",
    "nbt Nbt compound Has key",
    "nbt Nbt compound Has Key",
    "nbt Nbt Compound has key",
    "nbt Nbt Compound has Key",
    "nbt Nbt Compound Has key",
    "nbt Nbt Compound Has Key",
    "Nbt nbt compound has key",
    "Nbt nbt compound has Key",
    "Nbt nbt compound Has key",
    "Nbt nbt compound Has Key",
    "Nbt nbt Compound has key",
    "Nbt nbt Compound has Key",
    "Nbt nbt Compound Has key",
    "Nbt nbt Compound Has Key",
    "Nbt Nbt compound has key",
    "Nbt Nbt compound has Key",
    "Nbt Nbt compound Has key",
    "Nbt Nbt compound Has Key",
    "Nbt Nbt Compound has key",
    "Nbt Nbt Compound has Key",
    "Nbt Nbt Compound Has key",
    "Nbt Nbt Compound Has Key",
    "nbt NBT compound has key",
    "nbt NBT compound has Key",
    "nbt NBT compound Has key",
    "nbt NBT compound Has Key",
    "nbt NBT Compound has key",
    "nbt NBT Compound has Key",
    "nbt NBT Compound Has key",
    "nbt NBT Compound Has Key",
    "Nbt NBT compound has key",
    "Nbt NBT compound has Key",
    "Nbt NBT compound Has key",
    "Nbt NBT compound Has Key",
    "Nbt NBT Compound has key",
    "Nbt NBT Compound has Key",
    "Nbt NBT Compound Has key",
    "Nbt NBT Compound Has Key",
    "NBT nbt compound has key",
    "NBT nbt compound has Key",
    "NBT nbt compound Has key",
    "NBT nbt compound Has Key",
    "NBT nbt Compound has key",
    "NBT nbt Compound has Key",
    "NBT nbt Compound Has key",
    "NBT nbt Compound Has Key",
    "NBT Nbt compound has key",
    "NBT Nbt compound has Key",
    "NBT Nbt compound Has key",
    "NBT Nbt compound Has Key",
    "NBT Nbt Compound has key",
    "NBT Nbt Compound has Key",
    "NBT Nbt Compound Has key",
    "NBT Nbt Compound Has Key",
    "NBT NBT compound has key",
    "NBT NBT compound has Key",
    "NBT NBT compound Has key",
    "NBT NBT compound Has Key",
    "NBT NBT Compound has key",
    "NBT NBT Compound has Key",
    "NBT NBT Compound Has key",
    "NBT NBT Compound Has Key",
  ];
  static override tooltipInfo =
    "If the given NBT compound tag contains the given key" as const;

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
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (nbt: CompoundTag): TypeLambda<iString, iBoolean> => {
        return (key: iString): iBoolean => {
          return new iBoolean(nbt.has(key));
        };
      },
    });
  }
}
