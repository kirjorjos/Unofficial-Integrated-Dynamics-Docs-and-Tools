import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_AS_INT_LIST extends BaseOperator<ListTag, Integer> {
  static override internalName = "integrateddynamics:nbt_as_int_list" as const;
  static override numericID = 248;
  static override nicknames = ["nbtAsIntList", "as_int_list", "nbtAs_int_list"];
  static override symbol = "NBT.as_int_list";
  static override interactName = "nbtAsIntList";
  static override operatorName = "as_int_list" as const;
  static override displayName = "NBT Integer Array As Integer List" as const;
  static override fullDisplayName =
    "NBT NBT Integer Array As Integer List" as const;
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
          to: { type: "List", listType: { type: "Integer" } },
        },
        normalizeSignature
      ),
      function: (nbt: ListTag): iArray<Integer> => {
        if (nbt.getType() === Tag.TAG_INT_ARRAY) {
          const list = nbt.valueOf();
          if (!list.every((e: Tag<any>) => e.getType() == Tag.TAG_INT))
            return new iArrayEager<Integer>([]);
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
          ) as iArray<Integer>;
        } else {
          return new iArrayEager<Integer>([]);
        }
      },
    });
  }
}
