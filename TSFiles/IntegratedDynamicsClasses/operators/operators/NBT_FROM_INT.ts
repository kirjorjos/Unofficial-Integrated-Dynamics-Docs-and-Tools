import { globalMap } from "HelperClasses/TypeMap";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_INT extends BaseOperator<Integer, IntTag> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_from_int",
      nicknames: ["nbtFromInt"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_int",
      interactName: "integerAsNbt",
      function: (int: Integer): IntTag => {
        return new IntTag(int);
      },
    });
  }
}
