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
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

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
  ];
  static override symbol = "NBT{}.get_list_byte";
  static override interactName = "nbtGetListByte";
  static override operatorName = "compound_value_list_byte" as const;
  static override displayName = "NBT Compound Value Byte Array" as const;
  static override fullDisplayName =
    "NBT NBT Compound Value Byte Array" as const;
  static override stringDisplayNames = [
    "nbt compound value byte array",
    "nbt compound value byte Array",
    "nbt compound value Byte array",
    "nbt compound value Byte Array",
    "nbt compound Value byte array",
    "nbt compound Value byte Array",
    "nbt compound Value Byte array",
    "nbt compound Value Byte Array",
    "nbt Compound value byte array",
    "nbt Compound value byte Array",
    "nbt Compound value Byte array",
    "nbt Compound value Byte Array",
    "nbt Compound Value byte array",
    "nbt Compound Value byte Array",
    "nbt Compound Value Byte array",
    "nbt Compound Value Byte Array",
    "Nbt compound value byte array",
    "Nbt compound value byte Array",
    "Nbt compound value Byte array",
    "Nbt compound value Byte Array",
    "Nbt compound Value byte array",
    "Nbt compound Value byte Array",
    "Nbt compound Value Byte array",
    "Nbt compound Value Byte Array",
    "Nbt Compound value byte array",
    "Nbt Compound value byte Array",
    "Nbt Compound value Byte array",
    "Nbt Compound value Byte Array",
    "Nbt Compound Value byte array",
    "Nbt Compound Value byte Array",
    "Nbt Compound Value Byte array",
    "Nbt Compound Value Byte Array",
    "NBT compound value byte array",
    "NBT compound value byte Array",
    "NBT compound value Byte array",
    "NBT compound value Byte Array",
    "NBT compound Value byte array",
    "NBT compound Value byte Array",
    "NBT compound Value Byte array",
    "NBT compound Value Byte Array",
    "NBT Compound value byte array",
    "NBT Compound value byte Array",
    "NBT Compound value Byte array",
    "NBT Compound value Byte Array",
    "NBT Compound Value byte array",
    "NBT Compound Value byte Array",
    "NBT Compound Value Byte array",
    "NBT Compound Value Byte Array",
    "nbt nbt compound value byte array",
    "nbt nbt compound value byte Array",
    "nbt nbt compound value Byte array",
    "nbt nbt compound value Byte Array",
    "nbt nbt compound Value byte array",
    "nbt nbt compound Value byte Array",
    "nbt nbt compound Value Byte array",
    "nbt nbt compound Value Byte Array",
    "nbt nbt Compound value byte array",
    "nbt nbt Compound value byte Array",
    "nbt nbt Compound value Byte array",
    "nbt nbt Compound value Byte Array",
    "nbt nbt Compound Value byte array",
    "nbt nbt Compound Value byte Array",
    "nbt nbt Compound Value Byte array",
    "nbt nbt Compound Value Byte Array",
    "nbt Nbt compound value byte array",
    "nbt Nbt compound value byte Array",
    "nbt Nbt compound value Byte array",
    "nbt Nbt compound value Byte Array",
    "nbt Nbt compound Value byte array",
    "nbt Nbt compound Value byte Array",
    "nbt Nbt compound Value Byte array",
    "nbt Nbt compound Value Byte Array",
    "nbt Nbt Compound value byte array",
    "nbt Nbt Compound value byte Array",
    "nbt Nbt Compound value Byte array",
    "nbt Nbt Compound value Byte Array",
    "nbt Nbt Compound Value byte array",
    "nbt Nbt Compound Value byte Array",
    "nbt Nbt Compound Value Byte array",
    "nbt Nbt Compound Value Byte Array",
    "Nbt nbt compound value byte array",
    "Nbt nbt compound value byte Array",
    "Nbt nbt compound value Byte array",
    "Nbt nbt compound value Byte Array",
    "Nbt nbt compound Value byte array",
    "Nbt nbt compound Value byte Array",
    "Nbt nbt compound Value Byte array",
    "Nbt nbt compound Value Byte Array",
    "Nbt nbt Compound value byte array",
    "Nbt nbt Compound value byte Array",
    "Nbt nbt Compound value Byte array",
    "Nbt nbt Compound value Byte Array",
    "Nbt nbt Compound Value byte array",
    "Nbt nbt Compound Value byte Array",
    "Nbt nbt Compound Value Byte array",
    "Nbt nbt Compound Value Byte Array",
    "Nbt Nbt compound value byte array",
    "Nbt Nbt compound value byte Array",
    "Nbt Nbt compound value Byte array",
    "Nbt Nbt compound value Byte Array",
    "Nbt Nbt compound Value byte array",
    "Nbt Nbt compound Value byte Array",
    "Nbt Nbt compound Value Byte array",
    "Nbt Nbt compound Value Byte Array",
    "Nbt Nbt Compound value byte array",
    "Nbt Nbt Compound value byte Array",
    "Nbt Nbt Compound value Byte array",
    "Nbt Nbt Compound value Byte Array",
    "Nbt Nbt Compound Value byte array",
    "Nbt Nbt Compound Value byte Array",
    "Nbt Nbt Compound Value Byte array",
    "Nbt Nbt Compound Value Byte Array",
    "nbt NBT compound value byte array",
    "nbt NBT compound value byte Array",
    "nbt NBT compound value Byte array",
    "nbt NBT compound value Byte Array",
    "nbt NBT compound Value byte array",
    "nbt NBT compound Value byte Array",
    "nbt NBT compound Value Byte array",
    "nbt NBT compound Value Byte Array",
    "nbt NBT Compound value byte array",
    "nbt NBT Compound value byte Array",
    "nbt NBT Compound value Byte array",
    "nbt NBT Compound value Byte Array",
    "nbt NBT Compound Value byte array",
    "nbt NBT Compound Value byte Array",
    "nbt NBT Compound Value Byte array",
    "nbt NBT Compound Value Byte Array",
    "Nbt NBT compound value byte array",
    "Nbt NBT compound value byte Array",
    "Nbt NBT compound value Byte array",
    "Nbt NBT compound value Byte Array",
    "Nbt NBT compound Value byte array",
    "Nbt NBT compound Value byte Array",
    "Nbt NBT compound Value Byte array",
    "Nbt NBT compound Value Byte Array",
    "Nbt NBT Compound value byte array",
    "Nbt NBT Compound value byte Array",
    "Nbt NBT Compound value Byte array",
    "Nbt NBT Compound value Byte Array",
    "Nbt NBT Compound Value byte array",
    "Nbt NBT Compound Value byte Array",
    "Nbt NBT Compound Value Byte array",
    "Nbt NBT Compound Value Byte Array",
    "NBT nbt compound value byte array",
    "NBT nbt compound value byte Array",
    "NBT nbt compound value Byte array",
    "NBT nbt compound value Byte Array",
    "NBT nbt compound Value byte array",
    "NBT nbt compound Value byte Array",
    "NBT nbt compound Value Byte array",
    "NBT nbt compound Value Byte Array",
    "NBT nbt Compound value byte array",
    "NBT nbt Compound value byte Array",
    "NBT nbt Compound value Byte array",
    "NBT nbt Compound value Byte Array",
    "NBT nbt Compound Value byte array",
    "NBT nbt Compound Value byte Array",
    "NBT nbt Compound Value Byte array",
    "NBT nbt Compound Value Byte Array",
    "NBT Nbt compound value byte array",
    "NBT Nbt compound value byte Array",
    "NBT Nbt compound value Byte array",
    "NBT Nbt compound value Byte Array",
    "NBT Nbt compound Value byte array",
    "NBT Nbt compound Value byte Array",
    "NBT Nbt compound Value Byte array",
    "NBT Nbt compound Value Byte Array",
    "NBT Nbt Compound value byte array",
    "NBT Nbt Compound value byte Array",
    "NBT Nbt Compound value Byte array",
    "NBT Nbt Compound value Byte Array",
    "NBT Nbt Compound Value byte array",
    "NBT Nbt Compound Value byte Array",
    "NBT Nbt Compound Value Byte array",
    "NBT Nbt Compound Value Byte Array",
    "NBT NBT compound value byte array",
    "NBT NBT compound value byte Array",
    "NBT NBT compound value Byte array",
    "NBT NBT compound value Byte Array",
    "NBT NBT compound Value byte array",
    "NBT NBT compound Value byte Array",
    "NBT NBT compound Value Byte array",
    "NBT NBT compound Value Byte Array",
    "NBT NBT Compound value byte array",
    "NBT NBT Compound value byte Array",
    "NBT NBT Compound value Byte array",
    "NBT NBT Compound value Byte Array",
    "NBT NBT Compound Value byte array",
    "NBT NBT Compound Value byte Array",
    "NBT NBT Compound Value Byte array",
    "NBT NBT Compound Value Byte Array",
  ];
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
              throw new iError(
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
          throw new iError(
            `${key.valueOf()} is not a list of byte in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
