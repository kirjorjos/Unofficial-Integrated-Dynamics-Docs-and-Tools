import { LongTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Long } from "JavaNumberClasses/Long";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_LONG extends BaseOperator<LongTag, Long> {
  static override internalName = "integrateddynamics:nbt_as_long" as const;
  static override nicknames = ["nbtAsLong"];
  static override symbol = "NBT.as_long";
  static override interactName = "nbtAsLong";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "NBT",
        },
        to: {
          type: "Long",
        },
      }),
      function: (nbt: LongTag): Long => {
        if (nbt.getType() === Tag.TAG_LONG) {
          return nbt.valueOf();
        } else {
          return Long.ZERO;
        }
      },
    });
  }
}
