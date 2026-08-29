import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_NBT_COMPOUND_VALUE_BOOLEAN extends BaseOperator<
  CompoundTag,
  Operator<iString, iBoolean>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_iBoolean" as const;
  static override numericID = 217;
  static override nicknames = [
    "compoundValueBoolean",
    "nbtCompoundValueBoolean",
    "nbtGetBoolean",
    "compound_value_boolean",
    "nbt_compound_value_boolean",
    "nbt_get_boolean",
  ];
  static override symbol = "NBT{}.get_iBoolean";
  static override interactName = "nbtGetBoolean";
  static override operatorName = "compound_value_boolean" as const;
  static override displayName = "NBT Compound Value Boolean" as const;
  static override fullDisplayName = "NBT NBT Compound Value Boolean" as const;
  static override stringDisplayNames = [
    "nbt compound value boolean",
    "nbt compound value Boolean",
    "nbt compound Value boolean",
    "nbt compound Value Boolean",
    "nbt Compound value boolean",
    "nbt Compound value Boolean",
    "nbt Compound Value boolean",
    "nbt Compound Value Boolean",
    "Nbt compound value boolean",
    "Nbt compound value Boolean",
    "Nbt compound Value boolean",
    "Nbt compound Value Boolean",
    "Nbt Compound value boolean",
    "Nbt Compound value Boolean",
    "Nbt Compound Value boolean",
    "Nbt Compound Value Boolean",
    "NBT compound value boolean",
    "NBT compound value Boolean",
    "NBT compound Value boolean",
    "NBT compound Value Boolean",
    "NBT Compound value boolean",
    "NBT Compound value Boolean",
    "NBT Compound Value boolean",
    "NBT Compound Value Boolean",
    "nbt nbt compound value boolean",
    "nbt nbt compound value Boolean",
    "nbt nbt compound Value boolean",
    "nbt nbt compound Value Boolean",
    "nbt nbt Compound value boolean",
    "nbt nbt Compound value Boolean",
    "nbt nbt Compound Value boolean",
    "nbt nbt Compound Value Boolean",
    "nbt Nbt compound value boolean",
    "nbt Nbt compound value Boolean",
    "nbt Nbt compound Value boolean",
    "nbt Nbt compound Value Boolean",
    "nbt Nbt Compound value boolean",
    "nbt Nbt Compound value Boolean",
    "nbt Nbt Compound Value boolean",
    "nbt Nbt Compound Value Boolean",
    "Nbt nbt compound value boolean",
    "Nbt nbt compound value Boolean",
    "Nbt nbt compound Value boolean",
    "Nbt nbt compound Value Boolean",
    "Nbt nbt Compound value boolean",
    "Nbt nbt Compound value Boolean",
    "Nbt nbt Compound Value boolean",
    "Nbt nbt Compound Value Boolean",
    "Nbt Nbt compound value boolean",
    "Nbt Nbt compound value Boolean",
    "Nbt Nbt compound Value boolean",
    "Nbt Nbt compound Value Boolean",
    "Nbt Nbt Compound value boolean",
    "Nbt Nbt Compound value Boolean",
    "Nbt Nbt Compound Value boolean",
    "Nbt Nbt Compound Value Boolean",
    "nbt NBT compound value boolean",
    "nbt NBT compound value Boolean",
    "nbt NBT compound Value boolean",
    "nbt NBT compound Value Boolean",
    "nbt NBT Compound value boolean",
    "nbt NBT Compound value Boolean",
    "nbt NBT Compound Value boolean",
    "nbt NBT Compound Value Boolean",
    "Nbt NBT compound value boolean",
    "Nbt NBT compound value Boolean",
    "Nbt NBT compound Value boolean",
    "Nbt NBT compound Value Boolean",
    "Nbt NBT Compound value boolean",
    "Nbt NBT Compound value Boolean",
    "Nbt NBT Compound Value boolean",
    "Nbt NBT Compound Value Boolean",
    "NBT nbt compound value boolean",
    "NBT nbt compound value Boolean",
    "NBT nbt compound Value boolean",
    "NBT nbt compound Value Boolean",
    "NBT nbt Compound value boolean",
    "NBT nbt Compound value Boolean",
    "NBT nbt Compound Value boolean",
    "NBT nbt Compound Value Boolean",
    "NBT Nbt compound value boolean",
    "NBT Nbt compound value Boolean",
    "NBT Nbt compound Value boolean",
    "NBT Nbt compound Value Boolean",
    "NBT Nbt Compound value boolean",
    "NBT Nbt Compound value Boolean",
    "NBT Nbt Compound Value boolean",
    "NBT Nbt Compound Value Boolean",
    "NBT NBT compound value boolean",
    "NBT NBT compound value Boolean",
    "NBT NBT compound Value boolean",
    "NBT NBT compound Value Boolean",
    "NBT NBT Compound value boolean",
    "NBT NBT Compound value Boolean",
    "NBT NBT Compound Value boolean",
    "NBT NBT Compound Value Boolean",
  ];
  static override tooltipInfo =
    "The Boolean value in the given NBT compound tag with the given key" as const;

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
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (nbt: CompoundTag): TypeLambda<iString, iBoolean> => {
        return (key: iString): iBoolean => {
          const value = nbt.get(key);
          if (value instanceof ByteTag) {
            return new iBoolean(value.valueOf().toJSNumber() === 1);
          }
          if (value instanceof NullTag) {
            return new iBoolean(false);
          }
          throw new iError(
            `${key.valueOf()} is not a boolean in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
