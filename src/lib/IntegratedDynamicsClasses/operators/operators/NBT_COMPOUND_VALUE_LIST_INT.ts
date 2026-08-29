import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_INT extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Integer>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_list_int" as const;
  static override numericID = 220;
  static override nicknames = [
    "compoundValueListInt",
    "compoundValueListInteger",
    "nbtCompoundValueListInt",
    "nbtGetListInt",
    "compound_value_list_int",
    "compound_value_list_integer",
    "nbt_compound_value_list_int",
    "nbt_get_list_int",
  ];
  static override symbol = "NBT{}.get_list_int";
  static override interactName = "nbtGetListInt";
  static override operatorName = "compound_value_list_int" as const;
  static override displayName = "NBT Compound Value Integer Array" as const;
  static override fullDisplayName =
    "NBT NBT Compound Value Integer Array" as const;
  static override stringDisplayNames = [
    "nbt compound value integer array",
    "nbt compound value integer Array",
    "nbt compound value Integer array",
    "nbt compound value Integer Array",
    "nbt compound Value integer array",
    "nbt compound Value integer Array",
    "nbt compound Value Integer array",
    "nbt compound Value Integer Array",
    "nbt Compound value integer array",
    "nbt Compound value integer Array",
    "nbt Compound value Integer array",
    "nbt Compound value Integer Array",
    "nbt Compound Value integer array",
    "nbt Compound Value integer Array",
    "nbt Compound Value Integer array",
    "nbt Compound Value Integer Array",
    "Nbt compound value integer array",
    "Nbt compound value integer Array",
    "Nbt compound value Integer array",
    "Nbt compound value Integer Array",
    "Nbt compound Value integer array",
    "Nbt compound Value integer Array",
    "Nbt compound Value Integer array",
    "Nbt compound Value Integer Array",
    "Nbt Compound value integer array",
    "Nbt Compound value integer Array",
    "Nbt Compound value Integer array",
    "Nbt Compound value Integer Array",
    "Nbt Compound Value integer array",
    "Nbt Compound Value integer Array",
    "Nbt Compound Value Integer array",
    "Nbt Compound Value Integer Array",
    "NBT compound value integer array",
    "NBT compound value integer Array",
    "NBT compound value Integer array",
    "NBT compound value Integer Array",
    "NBT compound Value integer array",
    "NBT compound Value integer Array",
    "NBT compound Value Integer array",
    "NBT compound Value Integer Array",
    "NBT Compound value integer array",
    "NBT Compound value integer Array",
    "NBT Compound value Integer array",
    "NBT Compound value Integer Array",
    "NBT Compound Value integer array",
    "NBT Compound Value integer Array",
    "NBT Compound Value Integer array",
    "NBT Compound Value Integer Array",
    "nbt nbt compound value integer array",
    "nbt nbt compound value integer Array",
    "nbt nbt compound value Integer array",
    "nbt nbt compound value Integer Array",
    "nbt nbt compound Value integer array",
    "nbt nbt compound Value integer Array",
    "nbt nbt compound Value Integer array",
    "nbt nbt compound Value Integer Array",
    "nbt nbt Compound value integer array",
    "nbt nbt Compound value integer Array",
    "nbt nbt Compound value Integer array",
    "nbt nbt Compound value Integer Array",
    "nbt nbt Compound Value integer array",
    "nbt nbt Compound Value integer Array",
    "nbt nbt Compound Value Integer array",
    "nbt nbt Compound Value Integer Array",
    "nbt Nbt compound value integer array",
    "nbt Nbt compound value integer Array",
    "nbt Nbt compound value Integer array",
    "nbt Nbt compound value Integer Array",
    "nbt Nbt compound Value integer array",
    "nbt Nbt compound Value integer Array",
    "nbt Nbt compound Value Integer array",
    "nbt Nbt compound Value Integer Array",
    "nbt Nbt Compound value integer array",
    "nbt Nbt Compound value integer Array",
    "nbt Nbt Compound value Integer array",
    "nbt Nbt Compound value Integer Array",
    "nbt Nbt Compound Value integer array",
    "nbt Nbt Compound Value integer Array",
    "nbt Nbt Compound Value Integer array",
    "nbt Nbt Compound Value Integer Array",
    "Nbt nbt compound value integer array",
    "Nbt nbt compound value integer Array",
    "Nbt nbt compound value Integer array",
    "Nbt nbt compound value Integer Array",
    "Nbt nbt compound Value integer array",
    "Nbt nbt compound Value integer Array",
    "Nbt nbt compound Value Integer array",
    "Nbt nbt compound Value Integer Array",
    "Nbt nbt Compound value integer array",
    "Nbt nbt Compound value integer Array",
    "Nbt nbt Compound value Integer array",
    "Nbt nbt Compound value Integer Array",
    "Nbt nbt Compound Value integer array",
    "Nbt nbt Compound Value integer Array",
    "Nbt nbt Compound Value Integer array",
    "Nbt nbt Compound Value Integer Array",
    "Nbt Nbt compound value integer array",
    "Nbt Nbt compound value integer Array",
    "Nbt Nbt compound value Integer array",
    "Nbt Nbt compound value Integer Array",
    "Nbt Nbt compound Value integer array",
    "Nbt Nbt compound Value integer Array",
    "Nbt Nbt compound Value Integer array",
    "Nbt Nbt compound Value Integer Array",
    "Nbt Nbt Compound value integer array",
    "Nbt Nbt Compound value integer Array",
    "Nbt Nbt Compound value Integer array",
    "Nbt Nbt Compound value Integer Array",
    "Nbt Nbt Compound Value integer array",
    "Nbt Nbt Compound Value integer Array",
    "Nbt Nbt Compound Value Integer array",
    "Nbt Nbt Compound Value Integer Array",
    "nbt NBT compound value integer array",
    "nbt NBT compound value integer Array",
    "nbt NBT compound value Integer array",
    "nbt NBT compound value Integer Array",
    "nbt NBT compound Value integer array",
    "nbt NBT compound Value integer Array",
    "nbt NBT compound Value Integer array",
    "nbt NBT compound Value Integer Array",
    "nbt NBT Compound value integer array",
    "nbt NBT Compound value integer Array",
    "nbt NBT Compound value Integer array",
    "nbt NBT Compound value Integer Array",
    "nbt NBT Compound Value integer array",
    "nbt NBT Compound Value integer Array",
    "nbt NBT Compound Value Integer array",
    "nbt NBT Compound Value Integer Array",
    "Nbt NBT compound value integer array",
    "Nbt NBT compound value integer Array",
    "Nbt NBT compound value Integer array",
    "Nbt NBT compound value Integer Array",
    "Nbt NBT compound Value integer array",
    "Nbt NBT compound Value integer Array",
    "Nbt NBT compound Value Integer array",
    "Nbt NBT compound Value Integer Array",
    "Nbt NBT Compound value integer array",
    "Nbt NBT Compound value integer Array",
    "Nbt NBT Compound value Integer array",
    "Nbt NBT Compound value Integer Array",
    "Nbt NBT Compound Value integer array",
    "Nbt NBT Compound Value integer Array",
    "Nbt NBT Compound Value Integer array",
    "Nbt NBT Compound Value Integer Array",
    "NBT nbt compound value integer array",
    "NBT nbt compound value integer Array",
    "NBT nbt compound value Integer array",
    "NBT nbt compound value Integer Array",
    "NBT nbt compound Value integer array",
    "NBT nbt compound Value integer Array",
    "NBT nbt compound Value Integer array",
    "NBT nbt compound Value Integer Array",
    "NBT nbt Compound value integer array",
    "NBT nbt Compound value integer Array",
    "NBT nbt Compound value Integer array",
    "NBT nbt Compound value Integer Array",
    "NBT nbt Compound Value integer array",
    "NBT nbt Compound Value integer Array",
    "NBT nbt Compound Value Integer array",
    "NBT nbt Compound Value Integer Array",
    "NBT Nbt compound value integer array",
    "NBT Nbt compound value integer Array",
    "NBT Nbt compound value Integer array",
    "NBT Nbt compound value Integer Array",
    "NBT Nbt compound Value integer array",
    "NBT Nbt compound Value integer Array",
    "NBT Nbt compound Value Integer array",
    "NBT Nbt compound Value Integer Array",
    "NBT Nbt Compound value integer array",
    "NBT Nbt Compound value integer Array",
    "NBT Nbt Compound value Integer array",
    "NBT Nbt Compound value Integer Array",
    "NBT Nbt Compound Value integer array",
    "NBT Nbt Compound Value integer Array",
    "NBT Nbt Compound Value Integer array",
    "NBT Nbt Compound Value Integer Array",
    "NBT NBT compound value integer array",
    "NBT NBT compound value integer Array",
    "NBT NBT compound value Integer array",
    "NBT NBT compound value Integer Array",
    "NBT NBT compound Value integer array",
    "NBT NBT compound Value integer Array",
    "NBT NBT compound Value Integer array",
    "NBT NBT compound Value Integer Array",
    "NBT NBT Compound value integer array",
    "NBT NBT Compound value integer Array",
    "NBT NBT Compound value Integer array",
    "NBT NBT Compound value Integer Array",
    "NBT NBT Compound Value integer array",
    "NBT NBT Compound Value integer Array",
    "NBT NBT Compound Value Integer array",
    "NBT NBT Compound Value Integer Array",
  ];
  static override tooltipInfo =
    "The Integer Array in the given NBT compound tag with the given key as Integer List" as const;

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
            to: { type: "List", listType: { type: "Integer" } },
          },
        },
        normalizeSignature
      ),
      function: (nbt: CompoundTag): TypeLambda<iString, iArray<Integer>> => {
        return (key: iString): iArray<Integer> => {
          let value = nbt.get(key);
          if (value instanceof IntArrayTag) {
            return value.valueOf();
          }
          if (value instanceof NullTag) {
            return new iArrayEager([]);
          }
          if (value instanceof ListTag) {
            let list = value.getArray();
            if (!list.every((e) => e instanceof IntTag))
              throw new iError(
                `${key.valueOf()} is not a list of int in ${JSON.stringify(
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
                    to: { type: "Integer" },
                  },
                  normalizeSignature
                ),
              })
            ) as iArray<Integer>;
          }
          throw new iError(
            `${key.valueOf()} is not a list of int in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
