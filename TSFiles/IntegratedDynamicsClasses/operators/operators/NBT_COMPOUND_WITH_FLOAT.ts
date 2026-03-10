import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { FloatTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Double } from "JavaNumberClasses/Double";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_FLOAT extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<Double, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_float" as const;
  static override nicknames = [
    "nbtWithFloat",
    "nbtCompoundWithFloat",
    "NBTWithFloat",
  ];
  static override symbol = "NBT{}.with_float";
  static override interactName = "nbtWithFloat";
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
            type: "Function",
            from: {
              type: "Double",
            },
            to: {
              type: "NBT",
            },
          },
        },
      }),
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<Double, CompoundTag>> => {
        return (key: iString): TypeLambda<Double, CompoundTag> => {
          return (value: Double): CompoundTag => {
            return nbt.set(key.valueOf(), new FloatTag(value));
          };
        };
      },
    });
  }
}
