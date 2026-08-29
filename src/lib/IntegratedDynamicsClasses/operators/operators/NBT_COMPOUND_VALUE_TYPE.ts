import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_TYPE extends BaseOperator<
  CompoundTag,
  Operator<iString, iString>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_type" as const;
  static override numericID = 213;
  static override nicknames = [
    "compoundType",
    "nbtCompoundType",
    "nbtCompoundValueType",
    "nbtType",
    "NBTValueType",
    "compound_type",
    "n_b_t_value_type",
    "nbt_compound_value_type",
    "nbt_type",
  ];
  static override symbol = "NBT{}.type";
  static override interactName = "nbtType";
  static override operatorName = "compound_type" as const;
  static override displayName = "NBT Compound Entry Type" as const;
  static override fullDisplayName = "NBT NBT Compound Entry Type" as const;
  static override stringDisplayNames = [
    "nbt compound entry type",
    "nbt compound entry Type",
    "nbt compound Entry type",
    "nbt compound Entry Type",
    "nbt Compound entry type",
    "nbt Compound entry Type",
    "nbt Compound Entry type",
    "nbt Compound Entry Type",
    "Nbt compound entry type",
    "Nbt compound entry Type",
    "Nbt compound Entry type",
    "Nbt compound Entry Type",
    "Nbt Compound entry type",
    "Nbt Compound entry Type",
    "Nbt Compound Entry type",
    "Nbt Compound Entry Type",
    "NBT compound entry type",
    "NBT compound entry Type",
    "NBT compound Entry type",
    "NBT compound Entry Type",
    "NBT Compound entry type",
    "NBT Compound entry Type",
    "NBT Compound Entry type",
    "NBT Compound Entry Type",
    "nbt nbt compound entry type",
    "nbt nbt compound entry Type",
    "nbt nbt compound Entry type",
    "nbt nbt compound Entry Type",
    "nbt nbt Compound entry type",
    "nbt nbt Compound entry Type",
    "nbt nbt Compound Entry type",
    "nbt nbt Compound Entry Type",
    "nbt Nbt compound entry type",
    "nbt Nbt compound entry Type",
    "nbt Nbt compound Entry type",
    "nbt Nbt compound Entry Type",
    "nbt Nbt Compound entry type",
    "nbt Nbt Compound entry Type",
    "nbt Nbt Compound Entry type",
    "nbt Nbt Compound Entry Type",
    "Nbt nbt compound entry type",
    "Nbt nbt compound entry Type",
    "Nbt nbt compound Entry type",
    "Nbt nbt compound Entry Type",
    "Nbt nbt Compound entry type",
    "Nbt nbt Compound entry Type",
    "Nbt nbt Compound Entry type",
    "Nbt nbt Compound Entry Type",
    "Nbt Nbt compound entry type",
    "Nbt Nbt compound entry Type",
    "Nbt Nbt compound Entry type",
    "Nbt Nbt compound Entry Type",
    "Nbt Nbt Compound entry type",
    "Nbt Nbt Compound entry Type",
    "Nbt Nbt Compound Entry type",
    "Nbt Nbt Compound Entry Type",
    "nbt NBT compound entry type",
    "nbt NBT compound entry Type",
    "nbt NBT compound Entry type",
    "nbt NBT compound Entry Type",
    "nbt NBT Compound entry type",
    "nbt NBT Compound entry Type",
    "nbt NBT Compound Entry type",
    "nbt NBT Compound Entry Type",
    "Nbt NBT compound entry type",
    "Nbt NBT compound entry Type",
    "Nbt NBT compound Entry type",
    "Nbt NBT compound Entry Type",
    "Nbt NBT Compound entry type",
    "Nbt NBT Compound entry Type",
    "Nbt NBT Compound Entry type",
    "Nbt NBT Compound Entry Type",
    "NBT nbt compound entry type",
    "NBT nbt compound entry Type",
    "NBT nbt compound Entry type",
    "NBT nbt compound Entry Type",
    "NBT nbt Compound entry type",
    "NBT nbt Compound entry Type",
    "NBT nbt Compound Entry type",
    "NBT nbt Compound Entry Type",
    "NBT Nbt compound entry type",
    "NBT Nbt compound entry Type",
    "NBT Nbt compound Entry type",
    "NBT Nbt compound Entry Type",
    "NBT Nbt Compound entry type",
    "NBT Nbt Compound entry Type",
    "NBT Nbt Compound Entry type",
    "NBT Nbt Compound Entry Type",
    "NBT NBT compound entry type",
    "NBT NBT compound entry Type",
    "NBT NBT compound Entry type",
    "NBT NBT compound Entry Type",
    "NBT NBT Compound entry type",
    "NBT NBT Compound entry Type",
    "NBT NBT Compound Entry type",
    "NBT NBT Compound Entry Type",
  ];
  static override tooltipInfo =
    "The value type in the given NBT compound tag corresponding to the given key" as const;

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
              type: "String",
            },
          },
        },
        normalizeSignature
      ),
      function: (nbt: CompoundTag): TypeLambda<iString, iString> => {
        return (key: iString): iString => {
          if (!nbt.has(key)) {
            return new iString("null");
          }
          return nbt.get(key).getTypeAsString();
        };
      },
    });
  }
}
