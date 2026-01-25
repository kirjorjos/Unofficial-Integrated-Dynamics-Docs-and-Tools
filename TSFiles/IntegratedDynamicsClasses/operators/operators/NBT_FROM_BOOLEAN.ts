import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_BOOLEAN extends BaseOperator<iBoolean, ByteTag> {
  static override internalName =
    "integrateddynamics:nbt_from_iBoolean" as const;
  constructor() {
    super({
      nicknames: ["nbtFromBoolean"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Boolean",
        },
        to: {
          type: "NBT",
        },
      }),
      symbol: "NBT.from_iBoolean",
      interactName: "booleanAsNbt",
      function: (bool: iBoolean): ByteTag => {
        return new ByteTag(new Integer(+bool.valueOf()));
      },
    });
  }
}
