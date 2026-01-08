import { TypeMap } from "HelperClasses/TypeMap";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "../Operator";

export class OPERATOR_NBT_AS_BYTE_LIST extends BaseOperator<
  ListTag,
  iArray<Integer>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_as_byte_list",
      nicknames: ["nbtAsByteList"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "Integer" } },
        },
        globalMap
      ),
      symbol: "NBT.as_byte_list",
      interactName: "nbtAsByteList",
      function: (nbt: ListTag): iArray<Integer> => {
        if (nbt.getType() === Tag.TAG_LIST) {
          const list = nbt.valueOf();
          if (!list.every((e) => e.getType() == Tag.TAG_INT))
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
                globalMap
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
