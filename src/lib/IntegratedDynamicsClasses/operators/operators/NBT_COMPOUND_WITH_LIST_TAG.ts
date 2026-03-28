import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_NBT_COMPOUND_WITH_LIST_TAG extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iArray<Tag<IntegratedValue>>, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_list_tag" as const;
  static override numericID = 232;
  static override nicknames = [
    "nbtWithTagList",
    "nbtCompoundWithListTag",
    "NBTWithNBTList",
  ];
  static override symbol = "NBT{}.with_tag_list";
  static override interactName = "nbtWithTagList";
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
              from: { type: "List", listType: { type: "NBT" } },
              to: {
                type: "NBT",
              },
            },
          },
        },
        normalizeSignature
      ),
      function:
        (
          nbt: CompoundTag
        ): TypeLambda<
          iString,
          TypeLambda<iArray<Tag<IntegratedValue>>, CompoundTag>
        > =>
        (key: iString): TypeLambda<iArray<Tag<IntegratedValue>>, CompoundTag> =>
        (value: iArray<Tag<IntegratedValue>>): CompoundTag => {
          return nbt.set(key.valueOf(), new ListTag(value));
        },
    });
  }
}
