import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Long } from "lib/JavaNumberClasses/Long";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";

export class OPERATOR_NBT_AS_LONG_LIST extends BaseOperator<
  ListTag,
  iArray<Long>
> {
  static override internalName = "integrateddynamics:nbt_as_long_list" as const;
  static override numericID = 250;
  static override nicknames = [
    "nbtAsLongList",
    "as_long_list",
    "nbtAs_long_list",
  ];
  static override symbol = "NBT.as_long_list";
  static override interactName = "nbtAsLongList";
  static override operatorName = "as_long_list" as const;
  static override kind = "nbt" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "Long" } },
        },
        normalizeSignature
      ),
      function: (nbt: ListTag): iArray<Long> => {
        if (nbt.getType() === Tag.TAG_LONG_ARRAY) {
          const list = nbt.valueOf();
          if (!list.every((e: Tag<any>) => e.getType() == Tag.TAG_LONG))
            return new iArrayEager<Long>([]);
          return list.map(
            new Operator({
              function: ((e: IntegratedValue) => e.valueOf()) as TypeLambda<
                IntegratedValue,
                IntegratedValue
              >,
              parsedSignature: new ParsedSignature(
                {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Any", typeID: 2 },
                } as TypeRawSignatureAST.RawSignatureDefiniteValue,
                normalizeSignature
              ),
            })
          ) as iArray<Long>;
        } else {
          return new iArrayEager<Long>([]);
        }
      },
    });
  }
}
