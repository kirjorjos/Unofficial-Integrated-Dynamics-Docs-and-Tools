import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { LongArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongArrayTag";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { Long } from "lib/JavaNumberClasses/Long";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Long>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_list_long" as const;
  static override numericID = 241;
  static override nicknames = [
    "compoundValueListLong",
    "nbtCompoundValueListLong",
    "nbtGetListLong",
    "compound_value_list_long",
    "nbt_compound_value_list_long",
    "nbt_get_list_long",
  ];
  static override symbol = "NBT{}.get_list_long";
  static override interactName = "nbtGetListLong";
  static override operatorName = "compound_value_list_long" as const;
  static override displayName = "NBT Compound Value Long Array" as const;
  static override fullDisplayName =
    "NBT NBT Compound Value Long Array" as const;
  static override stringDisplayNames = [
    "nbt compound value long array",
    "nbt compound value long Array",
    "nbt compound value Long array",
    "nbt compound value Long Array",
    "nbt compound Value long array",
    "nbt compound Value long Array",
    "nbt compound Value Long array",
    "nbt compound Value Long Array",
    "nbt Compound value long array",
    "nbt Compound value long Array",
    "nbt Compound value Long array",
    "nbt Compound value Long Array",
    "nbt Compound Value long array",
    "nbt Compound Value long Array",
    "nbt Compound Value Long array",
    "nbt Compound Value Long Array",
    "Nbt compound value long array",
    "Nbt compound value long Array",
    "Nbt compound value Long array",
    "Nbt compound value Long Array",
    "Nbt compound Value long array",
    "Nbt compound Value long Array",
    "Nbt compound Value Long array",
    "Nbt compound Value Long Array",
    "Nbt Compound value long array",
    "Nbt Compound value long Array",
    "Nbt Compound value Long array",
    "Nbt Compound value Long Array",
    "Nbt Compound Value long array",
    "Nbt Compound Value long Array",
    "Nbt Compound Value Long array",
    "Nbt Compound Value Long Array",
    "NBT compound value long array",
    "NBT compound value long Array",
    "NBT compound value Long array",
    "NBT compound value Long Array",
    "NBT compound Value long array",
    "NBT compound Value long Array",
    "NBT compound Value Long array",
    "NBT compound Value Long Array",
    "NBT Compound value long array",
    "NBT Compound value long Array",
    "NBT Compound value Long array",
    "NBT Compound value Long Array",
    "NBT Compound Value long array",
    "NBT Compound Value long Array",
    "NBT Compound Value Long array",
    "NBT Compound Value Long Array",
    "nbt nbt compound value long array",
    "nbt nbt compound value long Array",
    "nbt nbt compound value Long array",
    "nbt nbt compound value Long Array",
    "nbt nbt compound Value long array",
    "nbt nbt compound Value long Array",
    "nbt nbt compound Value Long array",
    "nbt nbt compound Value Long Array",
    "nbt nbt Compound value long array",
    "nbt nbt Compound value long Array",
    "nbt nbt Compound value Long array",
    "nbt nbt Compound value Long Array",
    "nbt nbt Compound Value long array",
    "nbt nbt Compound Value long Array",
    "nbt nbt Compound Value Long array",
    "nbt nbt Compound Value Long Array",
    "nbt Nbt compound value long array",
    "nbt Nbt compound value long Array",
    "nbt Nbt compound value Long array",
    "nbt Nbt compound value Long Array",
    "nbt Nbt compound Value long array",
    "nbt Nbt compound Value long Array",
    "nbt Nbt compound Value Long array",
    "nbt Nbt compound Value Long Array",
    "nbt Nbt Compound value long array",
    "nbt Nbt Compound value long Array",
    "nbt Nbt Compound value Long array",
    "nbt Nbt Compound value Long Array",
    "nbt Nbt Compound Value long array",
    "nbt Nbt Compound Value long Array",
    "nbt Nbt Compound Value Long array",
    "nbt Nbt Compound Value Long Array",
    "Nbt nbt compound value long array",
    "Nbt nbt compound value long Array",
    "Nbt nbt compound value Long array",
    "Nbt nbt compound value Long Array",
    "Nbt nbt compound Value long array",
    "Nbt nbt compound Value long Array",
    "Nbt nbt compound Value Long array",
    "Nbt nbt compound Value Long Array",
    "Nbt nbt Compound value long array",
    "Nbt nbt Compound value long Array",
    "Nbt nbt Compound value Long array",
    "Nbt nbt Compound value Long Array",
    "Nbt nbt Compound Value long array",
    "Nbt nbt Compound Value long Array",
    "Nbt nbt Compound Value Long array",
    "Nbt nbt Compound Value Long Array",
    "Nbt Nbt compound value long array",
    "Nbt Nbt compound value long Array",
    "Nbt Nbt compound value Long array",
    "Nbt Nbt compound value Long Array",
    "Nbt Nbt compound Value long array",
    "Nbt Nbt compound Value long Array",
    "Nbt Nbt compound Value Long array",
    "Nbt Nbt compound Value Long Array",
    "Nbt Nbt Compound value long array",
    "Nbt Nbt Compound value long Array",
    "Nbt Nbt Compound value Long array",
    "Nbt Nbt Compound value Long Array",
    "Nbt Nbt Compound Value long array",
    "Nbt Nbt Compound Value long Array",
    "Nbt Nbt Compound Value Long array",
    "Nbt Nbt Compound Value Long Array",
    "nbt NBT compound value long array",
    "nbt NBT compound value long Array",
    "nbt NBT compound value Long array",
    "nbt NBT compound value Long Array",
    "nbt NBT compound Value long array",
    "nbt NBT compound Value long Array",
    "nbt NBT compound Value Long array",
    "nbt NBT compound Value Long Array",
    "nbt NBT Compound value long array",
    "nbt NBT Compound value long Array",
    "nbt NBT Compound value Long array",
    "nbt NBT Compound value Long Array",
    "nbt NBT Compound Value long array",
    "nbt NBT Compound Value long Array",
    "nbt NBT Compound Value Long array",
    "nbt NBT Compound Value Long Array",
    "Nbt NBT compound value long array",
    "Nbt NBT compound value long Array",
    "Nbt NBT compound value Long array",
    "Nbt NBT compound value Long Array",
    "Nbt NBT compound Value long array",
    "Nbt NBT compound Value long Array",
    "Nbt NBT compound Value Long array",
    "Nbt NBT compound Value Long Array",
    "Nbt NBT Compound value long array",
    "Nbt NBT Compound value long Array",
    "Nbt NBT Compound value Long array",
    "Nbt NBT Compound value Long Array",
    "Nbt NBT Compound Value long array",
    "Nbt NBT Compound Value long Array",
    "Nbt NBT Compound Value Long array",
    "Nbt NBT Compound Value Long Array",
    "NBT nbt compound value long array",
    "NBT nbt compound value long Array",
    "NBT nbt compound value Long array",
    "NBT nbt compound value Long Array",
    "NBT nbt compound Value long array",
    "NBT nbt compound Value long Array",
    "NBT nbt compound Value Long array",
    "NBT nbt compound Value Long Array",
    "NBT nbt Compound value long array",
    "NBT nbt Compound value long Array",
    "NBT nbt Compound value Long array",
    "NBT nbt Compound value Long Array",
    "NBT nbt Compound Value long array",
    "NBT nbt Compound Value long Array",
    "NBT nbt Compound Value Long array",
    "NBT nbt Compound Value Long Array",
    "NBT Nbt compound value long array",
    "NBT Nbt compound value long Array",
    "NBT Nbt compound value Long array",
    "NBT Nbt compound value Long Array",
    "NBT Nbt compound Value long array",
    "NBT Nbt compound Value long Array",
    "NBT Nbt compound Value Long array",
    "NBT Nbt compound Value Long Array",
    "NBT Nbt Compound value long array",
    "NBT Nbt Compound value long Array",
    "NBT Nbt Compound value Long array",
    "NBT Nbt Compound value Long Array",
    "NBT Nbt Compound Value long array",
    "NBT Nbt Compound Value long Array",
    "NBT Nbt Compound Value Long array",
    "NBT Nbt Compound Value Long Array",
    "NBT NBT compound value long array",
    "NBT NBT compound value long Array",
    "NBT NBT compound value Long array",
    "NBT NBT compound value Long Array",
    "NBT NBT compound Value long array",
    "NBT NBT compound Value long Array",
    "NBT NBT compound Value Long array",
    "NBT NBT compound Value Long Array",
    "NBT NBT Compound value long array",
    "NBT NBT Compound value long Array",
    "NBT NBT Compound value Long array",
    "NBT NBT Compound value Long Array",
    "NBT NBT Compound Value long array",
    "NBT NBT Compound Value long Array",
    "NBT NBT Compound Value Long array",
    "NBT NBT Compound Value Long Array",
  ];
  static override tooltipInfo =
    "The Long Array in the given NBT compound tag with the given key as Long List" as const;

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
            to: { type: "List", listType: { type: "Long" } },
          },
        },
        normalizeSignature
      ),
      function: (nbt: CompoundTag): TypeLambda<iString, iArray<Long>> => {
        return (key: iString): iArray<Long> => {
          let value = nbt.get(key);
          if (value instanceof LongArrayTag) {
            return value.valueOf();
          }
          if (value instanceof NullTag) {
            return new iArrayEager([]);
          }
          if (value instanceof ListTag) {
            let list = value.getArray();
            if (!list.every((e) => e instanceof LongTag))
              throw new iError(
                `${key.valueOf()} is not a list of long in ${JSON.stringify(
                  nbt.toJSON()
                )}`
              );
            return list.map(
              new Operator({
                function: (e: Tag<IntegratedValue>) =>
                  e.valueOf() as IntegratedValue,
                parsedSignature: new ParsedSignature(
                  {
                    type: "Function",
                    from: { type: "NBT" },
                    to: { type: "Long" },
                  },
                  normalizeSignature
                ),
              })
            ) as iArray<Long>;
          }
          throw new iError(
            `${key.valueOf()} is not a list of long in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
