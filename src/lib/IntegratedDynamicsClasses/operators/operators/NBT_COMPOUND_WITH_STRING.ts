import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_WITH_STRING extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iString, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_string" as const;
  static override numericID = 235;
  static override nicknames = [
    "nbtWithString",
    "nbtCompoundWithString",
    "NBTWithString",
    "compound_with_string",
    "nbtCompound_with_string",
  ];
  static override symbol = "NBT{}.with_string";
  static override interactName = "nbtWithString";
  static override operatorName = "compound_with_string" as const;
  static override displayName = "NBT Compound With String" as const;
  static override fullDisplayName = "NBT NBT Compound With String" as const;
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
                type: "String",
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
      ): TypeLambda<iString, TypeLambda<iString, CompoundTag>> => {
        return (key: iString): TypeLambda<iString, CompoundTag> => {
          return (value: iString): CompoundTag => {
            return nbt.set(key.valueOf(), new StringTag(value));
          };
        };
      },
    });
  }
}
