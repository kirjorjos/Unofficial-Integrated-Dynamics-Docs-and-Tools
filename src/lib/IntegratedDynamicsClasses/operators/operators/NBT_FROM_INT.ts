import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_INT extends BaseOperator<Integer, IntTag> {
  static override internalName = "integrateddynamics:nbt_from_int" as const;
  static override numericID = 259;
  static override nicknames = ["integerAsNbt", "nbtFromInt"];
  static override symbol = "NBT.from_int";
  static override interactName = "integerAsNbt";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (int: Integer): IntTag => {
        return new IntTag(int);
      },
    });
  }
}
