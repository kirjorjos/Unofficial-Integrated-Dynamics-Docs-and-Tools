import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_WITH_BOOLEAN extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iBoolean, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_iBoolean" as const;
  static override numericID = 227;
  static override nicknames = [
    "nbtWithBoolean",
    "nbtCompoundWithBoolean",
    "NBTWithBoolean",
    "compound_with_boolean",
    "nbtCompound_with_boolean",
  ];
  static override symbol = "NBT{}.with_iBoolean";
  static override interactName = "nbtWithBoolean";
  static override operatorName = "compound_with_boolean" as const;
  static override kind = "nbt" as const;
  static override renderPattern = "INFIX_2_VERYLONG" as const;
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
                type: "Boolean",
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
      ): TypeLambda<iString, TypeLambda<iBoolean, CompoundTag>> => {
        return (key: iString): TypeLambda<iBoolean, CompoundTag> => {
          return (value: iBoolean): CompoundTag => {
            return nbt.set(
              key.valueOf(),
              new ByteTag(new Integer(+value.valueOf()))
            );
          };
        };
      },
    });
  }
}
