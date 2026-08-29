import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { ShortTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_NBT_COMPOUND_VALUE_INTEGER extends BaseOperator<
  CompoundTag,
  Operator<iString, Integer>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_integer" as const;
  static override numericID = 218;
  static override nicknames = [
    "compoundValueInteger",
    "nbtCompoundValueInteger",
    "nbtGetInteger",
    "compound_value_integer",
    "nbt_compound_value_integer",
    "nbt_get_integer",
  ];
  static override symbol = "NBT{}.get_integer";
  static override interactName = "nbtGetInteger";
  static override operatorName = "compound_value_integer" as const;
  static override displayName = "NBT Compound Value Integer" as const;
  static override fullDisplayName = "NBT NBT Compound Value Integer" as const;
  static override stringDisplayNames = [
    "nbt compound value integer",
    "nbt compound value Integer",
    "nbt compound Value integer",
    "nbt compound Value Integer",
    "nbt Compound value integer",
    "nbt Compound value Integer",
    "nbt Compound Value integer",
    "nbt Compound Value Integer",
    "Nbt compound value integer",
    "Nbt compound value Integer",
    "Nbt compound Value integer",
    "Nbt compound Value Integer",
    "Nbt Compound value integer",
    "Nbt Compound value Integer",
    "Nbt Compound Value integer",
    "Nbt Compound Value Integer",
    "NBT compound value integer",
    "NBT compound value Integer",
    "NBT compound Value integer",
    "NBT compound Value Integer",
    "NBT Compound value integer",
    "NBT Compound value Integer",
    "NBT Compound Value integer",
    "NBT Compound Value Integer",
    "nbt nbt compound value integer",
    "nbt nbt compound value Integer",
    "nbt nbt compound Value integer",
    "nbt nbt compound Value Integer",
    "nbt nbt Compound value integer",
    "nbt nbt Compound value Integer",
    "nbt nbt Compound Value integer",
    "nbt nbt Compound Value Integer",
    "nbt Nbt compound value integer",
    "nbt Nbt compound value Integer",
    "nbt Nbt compound Value integer",
    "nbt Nbt compound Value Integer",
    "nbt Nbt Compound value integer",
    "nbt Nbt Compound value Integer",
    "nbt Nbt Compound Value integer",
    "nbt Nbt Compound Value Integer",
    "Nbt nbt compound value integer",
    "Nbt nbt compound value Integer",
    "Nbt nbt compound Value integer",
    "Nbt nbt compound Value Integer",
    "Nbt nbt Compound value integer",
    "Nbt nbt Compound value Integer",
    "Nbt nbt Compound Value integer",
    "Nbt nbt Compound Value Integer",
    "Nbt Nbt compound value integer",
    "Nbt Nbt compound value Integer",
    "Nbt Nbt compound Value integer",
    "Nbt Nbt compound Value Integer",
    "Nbt Nbt Compound value integer",
    "Nbt Nbt Compound value Integer",
    "Nbt Nbt Compound Value integer",
    "Nbt Nbt Compound Value Integer",
    "nbt NBT compound value integer",
    "nbt NBT compound value Integer",
    "nbt NBT compound Value integer",
    "nbt NBT compound Value Integer",
    "nbt NBT Compound value integer",
    "nbt NBT Compound value Integer",
    "nbt NBT Compound Value integer",
    "nbt NBT Compound Value Integer",
    "Nbt NBT compound value integer",
    "Nbt NBT compound value Integer",
    "Nbt NBT compound Value integer",
    "Nbt NBT compound Value Integer",
    "Nbt NBT Compound value integer",
    "Nbt NBT Compound value Integer",
    "Nbt NBT Compound Value integer",
    "Nbt NBT Compound Value Integer",
    "NBT nbt compound value integer",
    "NBT nbt compound value Integer",
    "NBT nbt compound Value integer",
    "NBT nbt compound Value Integer",
    "NBT nbt Compound value integer",
    "NBT nbt Compound value Integer",
    "NBT nbt Compound Value integer",
    "NBT nbt Compound Value Integer",
    "NBT Nbt compound value integer",
    "NBT Nbt compound value Integer",
    "NBT Nbt compound Value integer",
    "NBT Nbt compound Value Integer",
    "NBT Nbt Compound value integer",
    "NBT Nbt Compound value Integer",
    "NBT Nbt Compound Value integer",
    "NBT Nbt Compound Value Integer",
    "NBT NBT compound value integer",
    "NBT NBT compound value Integer",
    "NBT NBT compound Value integer",
    "NBT NBT compound Value Integer",
    "NBT NBT Compound value integer",
    "NBT NBT Compound value Integer",
    "NBT NBT Compound Value integer",
    "NBT NBT Compound Value Integer",
  ];
  static override tooltipInfo =
    "The Integer value in the given NBT compound tag with the given key" as const;

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
              type: "Integer",
            },
          },
        },
        normalizeSignature
      ),
      function: (nbt: CompoundTag): TypeLambda<iString, Integer> => {
        return (key: iString): Integer => {
          let value = nbt.get(key);
          if (
            value instanceof IntTag ||
            value instanceof ByteTag ||
            value instanceof ShortTag
          ) {
            return (value as IntTag).valueOf();
          }
          if (value instanceof NullTag) {
            return new Integer(0);
          }
          throw new iError(
            `${key.valueOf()} is not an integer in ${JSON.stringify(nbt.toJSON())}`
          );
        };
      },
    });
  }
}
