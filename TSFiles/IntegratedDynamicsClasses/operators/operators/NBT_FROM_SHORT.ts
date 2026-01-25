import { ShortTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_SHORT extends BaseOperator<Integer, ShortTag> {
  static override internalName = "integrateddynamics:nbt_from_short" as const;
  constructor() {
    super({
      nicknames: ["nbtFromShort"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Integer",
        },
        to: {
          type: "NBT",
        },
      }),
      symbol: "NBT.from_short",
      interactName: "shortAsNbt",
      function: (short: Integer): ShortTag => {
        return new ShortTag(short);
      },
    });
  }
}
