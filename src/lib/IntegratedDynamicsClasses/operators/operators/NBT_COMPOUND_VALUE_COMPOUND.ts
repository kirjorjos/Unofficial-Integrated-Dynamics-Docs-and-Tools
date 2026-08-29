import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

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
  static override stringDisplayNames = [
    "nbt compound value compound",
    "nbt compound value Compound",
    "nbt compound Value compound",
    "nbt compound Value Compound",
    "nbt Compound value compound",
    "nbt Compound value Compound",
    "nbt Compound Value compound",
    "nbt Compound Value Compound",
    "Nbt compound value compound",
    "Nbt compound value Compound",
    "Nbt compound Value compound",
    "Nbt compound Value Compound",
    "Nbt Compound value compound",
    "Nbt Compound value Compound",
    "Nbt Compound Value compound",
    "Nbt Compound Value Compound",
    "NBT compound value compound",
    "NBT compound value Compound",
    "NBT compound Value compound",
    "NBT compound Value Compound",
    "NBT Compound value compound",
    "NBT Compound value Compound",
    "NBT Compound Value compound",
    "NBT Compound Value Compound",
    "nbt nbt compound value compound",
    "nbt nbt compound value Compound",
    "nbt nbt compound Value compound",
    "nbt nbt compound Value Compound",
    "nbt nbt Compound value compound",
    "nbt nbt Compound value Compound",
    "nbt nbt Compound Value compound",
    "nbt nbt Compound Value Compound",
    "nbt Nbt compound value compound",
    "nbt Nbt compound value Compound",
    "nbt Nbt compound Value compound",
    "nbt Nbt compound Value Compound",
    "nbt Nbt Compound value compound",
    "nbt Nbt Compound value Compound",
    "nbt Nbt Compound Value compound",
    "nbt Nbt Compound Value Compound",
    "Nbt nbt compound value compound",
    "Nbt nbt compound value Compound",
    "Nbt nbt compound Value compound",
    "Nbt nbt compound Value Compound",
    "Nbt nbt Compound value compound",
    "Nbt nbt Compound value Compound",
    "Nbt nbt Compound Value compound",
    "Nbt nbt Compound Value Compound",
    "Nbt Nbt compound value compound",
    "Nbt Nbt compound value Compound",
    "Nbt Nbt compound Value compound",
    "Nbt Nbt compound Value Compound",
    "Nbt Nbt Compound value compound",
    "Nbt Nbt Compound value Compound",
    "Nbt Nbt Compound Value compound",
    "Nbt Nbt Compound Value Compound",
    "nbt NBT compound value compound",
    "nbt NBT compound value Compound",
    "nbt NBT compound Value compound",
    "nbt NBT compound Value Compound",
    "nbt NBT Compound value compound",
    "nbt NBT Compound value Compound",
    "nbt NBT Compound Value compound",
    "nbt NBT Compound Value Compound",
    "Nbt NBT compound value compound",
    "Nbt NBT compound value Compound",
    "Nbt NBT compound Value compound",
    "Nbt NBT compound Value Compound",
    "Nbt NBT Compound value compound",
    "Nbt NBT Compound value Compound",
    "Nbt NBT Compound Value compound",
    "Nbt NBT Compound Value Compound",
    "NBT nbt compound value compound",
    "NBT nbt compound value Compound",
    "NBT nbt compound Value compound",
    "NBT nbt compound Value Compound",
    "NBT nbt Compound value compound",
    "NBT nbt Compound value Compound",
    "NBT nbt Compound Value compound",
    "NBT nbt Compound Value Compound",
    "NBT Nbt compound value compound",
    "NBT Nbt compound value Compound",
    "NBT Nbt compound Value compound",
    "NBT Nbt compound Value Compound",
    "NBT Nbt Compound value compound",
    "NBT Nbt Compound value Compound",
    "NBT Nbt Compound Value compound",
    "NBT Nbt Compound Value Compound",
    "NBT NBT compound value compound",
    "NBT NBT compound value Compound",
    "NBT NBT compound Value compound",
    "NBT NBT compound Value Compound",
    "NBT NBT Compound value compound",
    "NBT NBT Compound value Compound",
    "NBT NBT Compound Value compound",
    "NBT NBT Compound Value Compound",
  ];
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
          throw new iError(
            `${key.valueOf()} is not a Compound in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
