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
