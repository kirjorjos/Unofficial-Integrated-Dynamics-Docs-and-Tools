import { globalMap } from "HelperClasses/TypeMap";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Long } from "JavaNumberClasses/Long";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_NBT_AS_LONG_LIST extends BaseOperator<
  ListTag,
  iArray<Long>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_as_long_list",
      nicknames: ["nbtAsLongList"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "Long" } },
        },
        globalMap
      ),
      symbol: "NBT.as_long_list",
      interactName: "nbtAsLongList",
      function: (nbt: ListTag): iArray<Long> => {
        if (nbt.getType() === Tag.TAG_LIST) {
          const list = nbt.valueOf();
          if (!list.every((e) => e.getType() == Tag.TAG_LONG))
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
                globalMap
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
