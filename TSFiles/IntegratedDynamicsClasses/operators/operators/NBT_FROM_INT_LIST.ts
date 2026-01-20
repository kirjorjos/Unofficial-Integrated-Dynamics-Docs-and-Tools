import { IntArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_INT_LIST extends BaseOperator<
  iArray<Integer>,
  IntArrayTag
> {
    static override internalName = "integrateddynamics:nbt_from_int_list"
  constructor() {
    super({
      nicknames: ["nbtFromIntList"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Integer" } },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_int_list",
      interactName: "intListAsNbt",
      function: (intList: iArray<Integer>): IntArrayTag => {
        return new IntArrayTag(intList);
      },
    });
  }
}
