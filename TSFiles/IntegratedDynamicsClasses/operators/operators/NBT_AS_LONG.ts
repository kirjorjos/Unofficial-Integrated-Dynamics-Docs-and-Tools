import { globalMap } from "HelperClasses/TypeMap";
import { LongTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Long } from "JavaNumberClasses/Long";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_AS_LONG extends BaseOperator<LongTag, Long> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_as_long",
      nicknames: ["nbtAsLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Long",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_long",
      interactName: "nbtAsLong",
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
