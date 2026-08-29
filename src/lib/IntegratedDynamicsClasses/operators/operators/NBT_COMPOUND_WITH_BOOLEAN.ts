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
    "compoundWithBoolean",
    "nbtCompoundWithBoolean",
    "nbtWithBoolean",
    "NBTWithBoolean",
    "compound_with_boolean",
    "n_b_t_with_boolean",
    "nbt_compound_with_boolean",
    "nbt_with_boolean",
  ];
  static override symbol = "NBT{}.with_iBoolean";
  static override interactName = "nbtWithBoolean";
  static override operatorName = "compound_with_boolean" as const;
  static override displayName = "NBT Compound With Boolean" as const;
  static override fullDisplayName = "NBT NBT Compound With Boolean" as const;
  static override stringDisplayNames = [
    "nbt compound with boolean",
    "nbt compound with Boolean",
    "nbt compound With boolean",
    "nbt compound With Boolean",
    "nbt Compound with boolean",
    "nbt Compound with Boolean",
    "nbt Compound With boolean",
    "nbt Compound With Boolean",
    "Nbt compound with boolean",
    "Nbt compound with Boolean",
    "Nbt compound With boolean",
    "Nbt compound With Boolean",
    "Nbt Compound with boolean",
    "Nbt Compound with Boolean",
    "Nbt Compound With boolean",
    "Nbt Compound With Boolean",
    "NBT compound with boolean",
    "NBT compound with Boolean",
    "NBT compound With boolean",
    "NBT compound With Boolean",
    "NBT Compound with boolean",
    "NBT Compound with Boolean",
    "NBT Compound With boolean",
    "NBT Compound With Boolean",
    "nbt nbt compound with boolean",
    "nbt nbt compound with Boolean",
    "nbt nbt compound With boolean",
    "nbt nbt compound With Boolean",
    "nbt nbt Compound with boolean",
    "nbt nbt Compound with Boolean",
    "nbt nbt Compound With boolean",
    "nbt nbt Compound With Boolean",
    "nbt Nbt compound with boolean",
    "nbt Nbt compound with Boolean",
    "nbt Nbt compound With boolean",
    "nbt Nbt compound With Boolean",
    "nbt Nbt Compound with boolean",
    "nbt Nbt Compound with Boolean",
    "nbt Nbt Compound With boolean",
    "nbt Nbt Compound With Boolean",
    "Nbt nbt compound with boolean",
    "Nbt nbt compound with Boolean",
    "Nbt nbt compound With boolean",
    "Nbt nbt compound With Boolean",
    "Nbt nbt Compound with boolean",
    "Nbt nbt Compound with Boolean",
    "Nbt nbt Compound With boolean",
    "Nbt nbt Compound With Boolean",
    "Nbt Nbt compound with boolean",
    "Nbt Nbt compound with Boolean",
    "Nbt Nbt compound With boolean",
    "Nbt Nbt compound With Boolean",
    "Nbt Nbt Compound with boolean",
    "Nbt Nbt Compound with Boolean",
    "Nbt Nbt Compound With boolean",
    "Nbt Nbt Compound With Boolean",
    "nbt NBT compound with boolean",
    "nbt NBT compound with Boolean",
    "nbt NBT compound With boolean",
    "nbt NBT compound With Boolean",
    "nbt NBT Compound with boolean",
    "nbt NBT Compound with Boolean",
    "nbt NBT Compound With boolean",
    "nbt NBT Compound With Boolean",
    "Nbt NBT compound with boolean",
    "Nbt NBT compound with Boolean",
    "Nbt NBT compound With boolean",
    "Nbt NBT compound With Boolean",
    "Nbt NBT Compound with boolean",
    "Nbt NBT Compound with Boolean",
    "Nbt NBT Compound With boolean",
    "Nbt NBT Compound With Boolean",
    "NBT nbt compound with boolean",
    "NBT nbt compound with Boolean",
    "NBT nbt compound With boolean",
    "NBT nbt compound With Boolean",
    "NBT nbt Compound with boolean",
    "NBT nbt Compound with Boolean",
    "NBT nbt Compound With boolean",
    "NBT nbt Compound With Boolean",
    "NBT Nbt compound with boolean",
    "NBT Nbt compound with Boolean",
    "NBT Nbt compound With boolean",
    "NBT Nbt compound With Boolean",
    "NBT Nbt Compound with boolean",
    "NBT Nbt Compound with Boolean",
    "NBT Nbt Compound With boolean",
    "NBT Nbt Compound With Boolean",
    "NBT NBT compound with boolean",
    "NBT NBT compound with Boolean",
    "NBT NBT compound With boolean",
    "NBT NBT compound With Boolean",
    "NBT NBT Compound with boolean",
    "NBT NBT Compound with Boolean",
    "NBT NBT Compound With boolean",
    "NBT NBT Compound With Boolean",
  ];
  static override tooltipInfo =
    "Get a copy of the given NBT compound tag with the given Boolean entry" as const;

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
