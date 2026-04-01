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

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Long>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_list_long" as const;
  static override numericID = 241;
  static override nicknames = [
    "nbtGetListLong",
    "nbtCompoundValueListLong",
    "compoundValueListLong",
    "compound_value_list_long",
    "nbtCompound_value_list_long",
  ];
  static override symbol = "NBT{}.get_list_long";
  static override interactName = "nbtGetListLong";
  static override operatorName = "compound_value_list_long" as const;
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
              throw new Error(
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
          throw new Error(
            `${key.valueOf()} is not a list of long in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
