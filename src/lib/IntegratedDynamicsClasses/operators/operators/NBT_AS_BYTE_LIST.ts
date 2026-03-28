import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_AS_BYTE_LIST extends BaseOperator<
  ListTag,
  iArray<Integer>
> {
  static override internalName = "integrateddynamics:nbt_as_byte_list" as const;
  static override numericID = 243;
  static override nicknames = ["nbtAsByteList"];
  static override symbol = "NBT.as_byte_list";
  static override interactName = "nbtAsByteList";
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
        if (nbt.getType() === Tag.TAG_BYTE_ARRAY) {
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
