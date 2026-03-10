import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { DoubleTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { FloatTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { LongTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { ShortTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";

export class OPERATOR_NBT_COMPOUND_VALUE_STRING extends BaseOperator<
  CompoundTag,
  Operator<iString, iString>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_string" as const;
  static override nicknames = [
    "nbtGetString",
    "nbtCompoundValueString",
    "compoundValueString",
  ];
  static override symbol = "NBT{}.get_string";
  static override interactName = "nbtGetString";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
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
          throw new Error(
            `${key.valueOf()} is not a string in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
