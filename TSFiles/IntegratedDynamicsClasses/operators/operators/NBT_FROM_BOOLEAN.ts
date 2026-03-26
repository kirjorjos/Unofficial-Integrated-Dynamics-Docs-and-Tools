import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_BOOLEAN extends BaseOperator<iBoolean, ByteTag> {
  static override internalName =
    "integrateddynamics:nbt_from_iBoolean" as const;
  static override numericID = 258;
  static override nicknames = ["booleanAsNbt", "nbtFromBoolean"];
  static override symbol = "NBT.from_iBoolean";
  static override interactName = "booleanAsNbt";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (bool: iBoolean): ByteTag => {
        return new ByteTag(new Integer(+bool.valueOf()));
      },
    });
  }
}
