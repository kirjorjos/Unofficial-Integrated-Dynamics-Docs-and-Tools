import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_STRING extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iString, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_string" as const;
  static override nicknames = [
    "nbtWithString",
    "nbtCompoundWithString",
    "NBTWithString",
  ];
  static override symbol = "NBT{}.with_string";
  static override interactName = "nbtWithString";
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
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<iString, CompoundTag>> => {
        return (key: iString): TypeLambda<iString, CompoundTag> => {
          return (value: iString): CompoundTag => {
            return nbt.set(key.valueOf(), new StringTag(value));
          };
        };
      },
    });
  }
}
