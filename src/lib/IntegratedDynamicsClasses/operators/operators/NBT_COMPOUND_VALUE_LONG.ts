import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { Long } from "lib/JavaNumberClasses/Long";
import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { ShortTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_NBT_COMPOUND_VALUE_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, Long>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_long" as const;
  static override numericID = 222;
  static override nicknames = [
    "compoundValueLong",
    "nbtCompoundValueLong",
    "nbtGetLong",
    "compound_value_long",
    "nbt_compound_value_long",
    "nbt_get_long",
  ];
  static override symbol = "NBT{}.get_long";
  static override interactName = "nbtGetLong";
  static override operatorName = "compound_value_long" as const;
  static override displayName = "NBT Compound Value Long" as const;
  static override fullDisplayName = "NBT NBT Compound Value Long" as const;
  static override stringDisplayNames = [
    "nbt compound value long",
    "nbt compound value Long",
    "nbt compound Value long",
    "nbt compound Value Long",
    "nbt Compound value long",
    "nbt Compound value Long",
    "nbt Compound Value long",
    "nbt Compound Value Long",
    "Nbt compound value long",
    "Nbt compound value Long",
    "Nbt compound Value long",
    "Nbt compound Value Long",
    "Nbt Compound value long",
    "Nbt Compound value Long",
    "Nbt Compound Value long",
    "Nbt Compound Value Long",
    "NBT compound value long",
    "NBT compound value Long",
    "NBT compound Value long",
    "NBT compound Value Long",
    "NBT Compound value long",
    "NBT Compound value Long",
    "NBT Compound Value long",
    "NBT Compound Value Long",
    "nbt nbt compound value long",
    "nbt nbt compound value Long",
    "nbt nbt compound Value long",
    "nbt nbt compound Value Long",
    "nbt nbt Compound value long",
    "nbt nbt Compound value Long",
    "nbt nbt Compound Value long",
    "nbt nbt Compound Value Long",
    "nbt Nbt compound value long",
    "nbt Nbt compound value Long",
    "nbt Nbt compound Value long",
    "nbt Nbt compound Value Long",
    "nbt Nbt Compound value long",
    "nbt Nbt Compound value Long",
    "nbt Nbt Compound Value long",
    "nbt Nbt Compound Value Long",
    "Nbt nbt compound value long",
    "Nbt nbt compound value Long",
    "Nbt nbt compound Value long",
    "Nbt nbt compound Value Long",
    "Nbt nbt Compound value long",
    "Nbt nbt Compound value Long",
    "Nbt nbt Compound Value long",
    "Nbt nbt Compound Value Long",
    "Nbt Nbt compound value long",
    "Nbt Nbt compound value Long",
    "Nbt Nbt compound Value long",
    "Nbt Nbt compound Value Long",
    "Nbt Nbt Compound value long",
    "Nbt Nbt Compound value Long",
    "Nbt Nbt Compound Value long",
    "Nbt Nbt Compound Value Long",
    "nbt NBT compound value long",
    "nbt NBT compound value Long",
    "nbt NBT compound Value long",
    "nbt NBT compound Value Long",
    "nbt NBT Compound value long",
    "nbt NBT Compound value Long",
    "nbt NBT Compound Value long",
    "nbt NBT Compound Value Long",
    "Nbt NBT compound value long",
    "Nbt NBT compound value Long",
    "Nbt NBT compound Value long",
    "Nbt NBT compound Value Long",
    "Nbt NBT Compound value long",
    "Nbt NBT Compound value Long",
    "Nbt NBT Compound Value long",
    "Nbt NBT Compound Value Long",
    "NBT nbt compound value long",
    "NBT nbt compound value Long",
    "NBT nbt compound Value long",
    "NBT nbt compound Value Long",
    "NBT nbt Compound value long",
    "NBT nbt Compound value Long",
    "NBT nbt Compound Value long",
    "NBT nbt Compound Value Long",
    "NBT Nbt compound value long",
    "NBT Nbt compound value Long",
    "NBT Nbt compound Value long",
    "NBT Nbt compound Value Long",
    "NBT Nbt Compound value long",
    "NBT Nbt Compound value Long",
    "NBT Nbt Compound Value long",
    "NBT Nbt Compound Value Long",
    "NBT NBT compound value long",
    "NBT NBT compound value Long",
    "NBT NBT compound Value long",
    "NBT NBT compound Value Long",
    "NBT NBT Compound value long",
    "NBT NBT Compound value Long",
    "NBT NBT Compound Value long",
    "NBT NBT Compound Value Long",
  ];
  static override tooltipInfo =
    "The Long value in the given NBT compound tag with the given key" as const;

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
              type: "Long",
            },
          },
        },
        normalizeSignature
      ),
      function: (nbt: CompoundTag): TypeLambda<iString, Long> => {
        return (key: iString): Long => {
          let value = nbt.get(key);
          if (
            value instanceof LongTag ||
            value instanceof IntTag ||
            value instanceof ByteTag ||
            value instanceof ShortTag
          ) {
            return new Long((value as LongTag).valueOf().toJSNumber());
          }
          if (value instanceof NullTag) {
            return new Long(0);
          }
          throw new iError(
            `${key.valueOf()} is not a long in ${JSON.stringify(nbt.toJSON())}`
          );
        };
      },
    });
  }
}
