import { globalMap } from "HelperClasses/TypeMap";
import { ShortTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_SHORT extends BaseOperator<Integer, ShortTag> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_from_short",
      nicknames: ["nbtFromShort"],
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
      symbol: "NBT.from_short",
      interactName: "shortAsNbt",
      function: (short: Integer): ShortTag => {
        return new ShortTag(short);
      },
    });
  }
}
