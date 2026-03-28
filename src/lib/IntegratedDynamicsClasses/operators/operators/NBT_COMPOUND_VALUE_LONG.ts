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

export class OPERATOR_NBT_COMPOUND_VALUE_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, Long>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_long" as const;
  static override numericID = 222;
  static override nicknames = [
    "nbtGetLong",
    "nbtCompoundValueLong",
    "compoundValueLong",
  ];
  static override symbol = "NBT{}.get_long";
  static override interactName = "nbtGetLong";
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
          throw new Error(
            `${key.valueOf()} is not a long in ${JSON.stringify(nbt.toJSON())}`
          );
        };
      },
    });
  }
}
