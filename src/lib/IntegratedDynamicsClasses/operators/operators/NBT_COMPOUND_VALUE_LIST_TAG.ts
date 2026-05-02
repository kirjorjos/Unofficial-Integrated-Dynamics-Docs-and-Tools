import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_TAG extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Tag<IntegratedValue>>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_list_tag" as const;
  static override numericID = 221;
  static override nicknames = [
    "compoundValueListNBT",
    "compoundValueListTag",
    "nbtCompoundValueList",
    "nbtCompoundValueListTag",
    "nbtGetGenericListTag",
    "compound_value_list_n_b_t",
    "compound_value_list_tag",
    "nbt_compound_value_list",
    "nbt_compound_value_list_tag",
    "nbt_get_generic_list_tag",
    "nbtCompound_value_list_tag",
  ];
  static override symbol = "NBT{}.get_list_tag";
  static override interactName = "nbtGetGenericListTag";
  static override operatorName = "compound_value_list_tag" as const;
  static override displayName = "NBT Compound Value List NBT" as const;
  static override fullDisplayName = "NBT NBT Compound Value List NBT" as const;
  static override tooltipInfo =
    "The NBT List value in the given NBT compound tag with the given key" as const;

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
            to: { type: "List", listType: { type: "NBT" } },
          },
        },
        normalizeSignature
      ),
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, iArray<Tag<IntegratedValue>>> => {
        return (key: iString): iArray<Tag<IntegratedValue>> => {
          if (!nbt.has(key)) {
            return new iArrayEager([]);
          }
          let listTag = nbt.get(key);
          if (listTag instanceof NullTag) {
            return new iArrayEager([]);
          }
          if (listTag.getType() != Tag.TAG_LIST)
            throw new Error(
              `${key.valueOf()} is not a list of NBT in ${JSON.stringify(nbt.toJSON())}`
            );
          return (listTag as ListTag).getArray();
        };
      },
    });
  }
}
