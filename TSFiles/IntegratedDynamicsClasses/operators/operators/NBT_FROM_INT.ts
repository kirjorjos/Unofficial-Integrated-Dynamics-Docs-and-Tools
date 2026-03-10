import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_INT extends BaseOperator<Integer, IntTag> {
  static override internalName = "integrateddynamics:nbt_from_int" as const;
  static override nicknames = ["nbtFromInt"];
  static override symbol = "NBT.from_int";
  static override interactName = "integerAsNbt";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Integer",
        },
        to: {
          type: "NBT",
        },
      }),
      function: (int: Integer): IntTag => {
        return new IntTag(int);
      },
    });
  }
}
