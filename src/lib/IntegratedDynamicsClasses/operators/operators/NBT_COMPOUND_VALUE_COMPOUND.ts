import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

export class OPERATOR_NBT_COMPOUND_VALUE_COMPOUND extends BaseOperator<
  CompoundTag,
  Operator<iString, CompoundTag>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_compound" as const;
  static override numericID = 215;
  static override nicknames = [
    "compoundValueCompound",
    "nbtCompoundValueCompound",
    "nbtGetCompound",
    "compound_value_compound",
    "nbt_compound_value_compound",
    "nbt_get_compound",
  ];
  static override symbol = "NBT{}.get_compound";
  static override interactName = "nbtGetCompound";
  static override operatorName = "compound_value_compound" as const;
  static override displayName = "NBT Compound Value Compound" as const;
  static override fullDisplayName = "NBT NBT Compound Value Compound" as const;
  static override tooltipInfo =
    "The Compound value in the given NBT compound tag with the given key" as const;

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
          let value = nbt.get(key);
          if (value instanceof CompoundTag) {
            return value;
          }
          if (value instanceof NullTag) {
            return new CompoundTag({});
          }
          throw new Error(
            `${key.valueOf()} is not a Compound in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
