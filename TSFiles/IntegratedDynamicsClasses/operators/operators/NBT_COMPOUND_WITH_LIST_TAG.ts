import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_NBT_COMPOUND_WITH_LIST_TAG extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iArray<Tag<IntegratedValue>>, CompoundTag>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_with_list_tag" as const;
  static override nicknames = ["nbtCompoundWithListTag", "NBTWithNBTList"];
  static override symbol = "NBT{}.with_tag_list";
  static override interactName = "nbtWithTagList";
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
            from: { type: "List", listType: { type: "NBT" } },
            to: {
              type: "NBT",
            },
          },
        },
      }),
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
