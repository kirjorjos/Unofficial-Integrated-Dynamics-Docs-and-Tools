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
    "nbtWithout",
    "nbtCompoundWithout",
    "NBTWithout",
    "compound_without",
    "nbtCompound_without",
  ];
  static override symbol = "NBT{}.without";
  static override interactName = "nbtWithout";
  static override operatorName = "compound_without" as const;
  static override displayName = "NBT Compound Without" as const;
  static override fullDisplayName = "NBT NBT Compound Without" as const;
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
