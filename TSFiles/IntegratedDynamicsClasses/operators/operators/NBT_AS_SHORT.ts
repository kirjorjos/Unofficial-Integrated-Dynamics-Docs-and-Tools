import { ShortTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_SHORT extends BaseOperator<ShortTag, Integer> {
  static override internalName = "integrateddynamics:nbt_as_short" as const;
  static override nicknames = ["nbtAsShort"];
  static override symbol = "NBT.as_short";
  static override interactName = "nbtAsShort";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Integer",
          },
        },
        normalizeSignature
      ),
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
