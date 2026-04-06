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
    "nbtHasKey",
    "nbtCompoundHaskey",
    "NBTHasKey",
    "compound_haskey",
    "nbtCompound_haskey",
  ];
  static override symbol = "NBT{}.has_key";
  static override interactName = "nbtHasKey";
  static override operatorName = "compound_haskey" as const;
  static override displayName = "NBT Compound Has Key" as const;
  static override fullDisplayName = "NBT NBT Compound Has Key" as const;
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
