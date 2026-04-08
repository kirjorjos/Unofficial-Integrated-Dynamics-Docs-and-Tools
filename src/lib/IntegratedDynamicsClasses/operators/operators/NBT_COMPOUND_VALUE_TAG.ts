import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_TAG extends BaseOperator<
  CompoundTag,
  Operator<iString, Tag<IntegratedValue>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_tag" as const;
  static override numericID = 224;
  static override nicknames = [
    "nbtGetTag",
    "nbtCompoundValueTag",
    "compoundValueAny",
    "compound_value_tag",
    "nbtCompound_value_tag",
  ];
  static override symbol = "NBT{}.get_tag";
  static override interactName = "nbtGetTag";
  static override operatorName = "compound_value_tag" as const;
  static override displayName = "NBT Compound Value" as const;
  static override fullDisplayName = "NBT NBT Compound Value" as const;
  static override tooltipInfo =
    "The value of any type in the given NBT compound tag with the given key" as const;

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
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, Tag<IntegratedValue>> => {
        return (key: iString): Tag<IntegratedValue> => {
          return nbt.get(key);
        };
      },
    });
  }
}
