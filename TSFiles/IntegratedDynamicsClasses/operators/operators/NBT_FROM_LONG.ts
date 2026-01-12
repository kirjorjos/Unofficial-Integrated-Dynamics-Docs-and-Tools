import { TypeMap } from "HelperClasses/TypeMap";
import { LongTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Long } from "JavaNumberClasses/Long";

export class OPERATOR_NBT_FROM_LONG extends BaseOperator<Long, LongTag> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_from_long",
      nicknames: ["nbtFromLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Long",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_long",
      interactName: "longAsNbt",
      function: (long: Long): LongTag => {
        return new LongTag(long);
      },
    });
  }
}
