import { LongTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Long } from "JavaNumberClasses/Long";

export class OPERATOR_NBT_FROM_LONG extends BaseOperator<Long, LongTag> {
  static override internalName = "integrateddynamics:nbt_from_long" as const;
  static override nicknames = ["nbtFromLong"];
  static override symbol = "NBT.from_long";
  static override interactName = "longAsNbt";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Long",
        },
        to: {
          type: "NBT",
        },
      }),
      function: (long: Long): LongTag => {
        return new LongTag(long);
      },
    });
  }
}
