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

export class OPERATOR_NBT_COMPOUND_VALUE_INTEGER extends BaseOperator<
  CompoundTag,
  Operator<iString, Integer>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_integer" as const;
  static override numericID = 218;
  static override nicknames = [
    "nbtGetInteger",
    "nbtCompoundValueInteger",
    "compoundValueInteger",
    "compound_value_integer",
    "nbtCompound_value_integer",
  ];
  static override symbol = "NBT{}.get_integer";
  static override interactName = "nbtGetInteger";
  static override operatorName = "compound_value_integer" as const;
  static override displayName = "NBT Compound Value Integer" as const;
  static override fullDisplayName = "NBT NBT Compound Value Integer" as const;
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
          throw new Error(
            `${key.valueOf()} is not an integer in ${JSON.stringify(nbt.toJSON())}`
          );
        };
      },
    });
  }
}
