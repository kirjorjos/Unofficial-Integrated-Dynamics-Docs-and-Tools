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
    "nbtWithTag",
    "nbtCompoundWithCompound",
    "NBTWithNBT",
    "compound_with_tag",
    "nbtCompound_with_tag",
  ];
  static override symbol = "NBT{}.with_tag";
  static override interactName = "nbtWithTag";
  static override operatorName = "compound_with_tag" as const;
  static override displayName = "NBT Compound With NBT" as const;
  static override fullDisplayName = "NBT NBT Compound With NBT" as const;
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
