import { ShortTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_SHORT extends BaseOperator<ShortTag, Integer> {
  static override internalName = "integrateddynamics:nbt_as_short" as const;
  constructor() {
    super({
      nicknames: ["nbtAsShort"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "NBT",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "NBT.as_short",
      interactName: "nbtAsShort",
      function: (nbt: IntTag): Integer => {
        if (nbt.getType() === Tag.TAG_SHORT) {
          return nbt.valueOf();
        } else {
          return Integer.ZERO;
        }
      },
    });
  }
}
