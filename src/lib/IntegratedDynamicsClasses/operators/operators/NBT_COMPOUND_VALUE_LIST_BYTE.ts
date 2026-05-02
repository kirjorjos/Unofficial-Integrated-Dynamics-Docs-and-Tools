import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { ByteArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_BYTE extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Integer>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_list_byte" as const;
  static override numericID = 219;
  static override nicknames = [
    "compoundValueListByte",
    "nbtCompoundValueListByte",
    "nbtGetListByte",
    "compound_value_list_byte",
    "nbt_compound_value_list_byte",
    "nbt_get_list_byte",
    "nbtCompound_value_list_byte",
  ];
  static override symbol = "NBT{}.get_list_byte";
  static override interactName = "nbtGetListByte";
  static override operatorName = "compound_value_list_byte" as const;
  static override displayName = "NBT Compound Value Byte Array" as const;
  static override fullDisplayName =
    "NBT NBT Compound Value Byte Array" as const;
  static override tooltipInfo =
    "The Byte Array in the given NBT compound tag with the given key as Integer List" as const;

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
          if (value instanceof ByteArrayTag) {
            return value.valueOf();
          }
          if (value instanceof NullTag) {
            return new iArrayEager([]);
          }
          if (value instanceof ListTag) {
            let list = value.getArray();
            if (!list.every((e) => e instanceof ByteTag))
              throw new Error(
                `${key.valueOf()} is not a list of byte in ${JSON.stringify(
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
          throw new Error(
            `${key.valueOf()} is not a list of byte in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
