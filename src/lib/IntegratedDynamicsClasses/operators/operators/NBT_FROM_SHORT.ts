import { ShortTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_SHORT extends BaseOperator<Integer, ShortTag> {
  static override internalName = "integrateddynamics:nbt_from_short" as const;
  static override numericID = 263;
  static override nicknames = ["shortAsNbt", "nbtFromShort"];
  static override symbol = "NBT.from_short";
  static override interactName = "shortAsNbt";
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
      function: (short: Integer): ShortTag => {
        return new ShortTag(short);
      },
    });
  }
}
