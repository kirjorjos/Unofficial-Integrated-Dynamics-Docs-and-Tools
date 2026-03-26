import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_INT extends BaseOperator<IntTag, Integer> {
  static override internalName = "integrateddynamics:nbt_as_int" as const;
  static override numericID = 247;
  static override nicknames = ["nbtAsInt"];
  static override symbol = "NBT.as_int";
  static override interactName = "nbtAsInt";
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
        if (nbt.getType() === Tag.TAG_INT) {
          return nbt.valueOf();
        } else {
          return Integer.ZERO;
        }
      },
    });
  }
}
