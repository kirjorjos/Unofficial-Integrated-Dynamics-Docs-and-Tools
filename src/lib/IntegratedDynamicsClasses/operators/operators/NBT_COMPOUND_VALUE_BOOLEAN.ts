import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

export class OPERATOR_NBT_COMPOUND_VALUE_BOOLEAN extends BaseOperator<
  CompoundTag,
  Operator<iString, iBoolean>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_iBoolean" as const;
  static override numericID = 217;
  static override nicknames = [
    "nbtGetBoolean",
    "nbtCompoundValueBoolean",
    "compoundValueBoolean",
    "compound_value_boolean",
    "nbtCompound_value_boolean",
  ];
  static override symbol = "NBT{}.get_iBoolean";
  static override interactName = "nbtGetBoolean";
  static override operatorName = "compound_value_boolean" as const;
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
          throw new Error(
            `${key.valueOf()} is not a boolean in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
