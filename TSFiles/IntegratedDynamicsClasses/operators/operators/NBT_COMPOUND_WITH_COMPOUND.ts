import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_COMPOUND extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<CompoundTag, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_tag" as const;
  static override numericID = 236;
  static override nicknames = [
    "nbtWithTag",
    "nbtCompoundWithCompound",
    "NBTWithNBT",
  ];
  static override symbol = "NBT{}.with_tag";
  static override interactName = "nbtWithTag";
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
                type: "NBT",
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
      ): TypeLambda<iString, TypeLambda<CompoundTag, CompoundTag>> => {
        return (key: iString): TypeLambda<CompoundTag, CompoundTag> => {
          return (value: CompoundTag): CompoundTag => {
            return nbt.set(key.valueOf(), value);
          };
        };
      },
    });
  }
}
