import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { FloatTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { ShortTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_NBT_COMPOUND_VALUE_STRING extends BaseOperator<
  CompoundTag,
  Operator<iString, iString>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_string" as const;
  static override numericID = 223;
  static override nicknames = [
    "compoundValueString",
    "nbtCompoundValueString",
    "nbtGetString",
    "compound_value_string",
    "nbt_compound_value_string",
    "nbt_get_string",
  ];
  static override symbol = "NBT{}.get_string";
  static override interactName = "nbtGetString";
  static override operatorName = "compound_value_string" as const;
  static override displayName = "NBT Compound Value String" as const;
  static override fullDisplayName = "NBT NBT Compound Value String" as const;
  static override stringDisplayNames = [
    "nbt compound value string",
    "nbt compound value String",
    "nbt compound Value string",
    "nbt compound Value String",
    "nbt Compound value string",
    "nbt Compound value String",
    "nbt Compound Value string",
    "nbt Compound Value String",
    "Nbt compound value string",
    "Nbt compound value String",
    "Nbt compound Value string",
    "Nbt compound Value String",
    "Nbt Compound value string",
    "Nbt Compound value String",
    "Nbt Compound Value string",
    "Nbt Compound Value String",
    "NBT compound value string",
    "NBT compound value String",
    "NBT compound Value string",
    "NBT compound Value String",
    "NBT Compound value string",
    "NBT Compound value String",
    "NBT Compound Value string",
    "NBT Compound Value String",
    "nbt nbt compound value string",
    "nbt nbt compound value String",
    "nbt nbt compound Value string",
    "nbt nbt compound Value String",
    "nbt nbt Compound value string",
    "nbt nbt Compound value String",
    "nbt nbt Compound Value string",
    "nbt nbt Compound Value String",
    "nbt Nbt compound value string",
    "nbt Nbt compound value String",
    "nbt Nbt compound Value string",
    "nbt Nbt compound Value String",
    "nbt Nbt Compound value string",
    "nbt Nbt Compound value String",
    "nbt Nbt Compound Value string",
    "nbt Nbt Compound Value String",
    "Nbt nbt compound value string",
    "Nbt nbt compound value String",
    "Nbt nbt compound Value string",
    "Nbt nbt compound Value String",
    "Nbt nbt Compound value string",
    "Nbt nbt Compound value String",
    "Nbt nbt Compound Value string",
    "Nbt nbt Compound Value String",
    "Nbt Nbt compound value string",
    "Nbt Nbt compound value String",
    "Nbt Nbt compound Value string",
    "Nbt Nbt compound Value String",
    "Nbt Nbt Compound value string",
    "Nbt Nbt Compound value String",
    "Nbt Nbt Compound Value string",
    "Nbt Nbt Compound Value String",
    "nbt NBT compound value string",
    "nbt NBT compound value String",
    "nbt NBT compound Value string",
    "nbt NBT compound Value String",
    "nbt NBT Compound value string",
    "nbt NBT Compound value String",
    "nbt NBT Compound Value string",
    "nbt NBT Compound Value String",
    "Nbt NBT compound value string",
    "Nbt NBT compound value String",
    "Nbt NBT compound Value string",
    "Nbt NBT compound Value String",
    "Nbt NBT Compound value string",
    "Nbt NBT Compound value String",
    "Nbt NBT Compound Value string",
    "Nbt NBT Compound Value String",
    "NBT nbt compound value string",
    "NBT nbt compound value String",
    "NBT nbt compound Value string",
    "NBT nbt compound Value String",
    "NBT nbt Compound value string",
    "NBT nbt Compound value String",
    "NBT nbt Compound Value string",
    "NBT nbt Compound Value String",
    "NBT Nbt compound value string",
    "NBT Nbt compound value String",
    "NBT Nbt compound Value string",
    "NBT Nbt compound Value String",
    "NBT Nbt Compound value string",
    "NBT Nbt Compound value String",
    "NBT Nbt Compound Value string",
    "NBT Nbt Compound Value String",
    "NBT NBT compound value string",
    "NBT NBT compound value String",
    "NBT NBT compound Value string",
    "NBT NBT compound Value String",
    "NBT NBT Compound value string",
    "NBT NBT Compound value String",
    "NBT NBT Compound Value string",
    "NBT NBT Compound Value String",
  ];
  static override tooltipInfo =
    "The String value in the given NBT compound tag with the given key" as const;

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
          let value = nbt.get(key);
          if (value instanceof StringTag) {
            return value.valueOf();
          }
          if (
            value instanceof ByteTag ||
            value instanceof ShortTag ||
            value instanceof IntTag ||
            value instanceof LongTag ||
            value instanceof FloatTag ||
            value instanceof DoubleTag
          ) {
            return new iString(value.valueOf().toDecimal());
          }
          if (value instanceof NullTag) {
            return new iString("");
          }
          throw new iError(
            `${key.valueOf()} is not a string in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
