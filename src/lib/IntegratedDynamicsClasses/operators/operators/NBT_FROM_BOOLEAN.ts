import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_BOOLEAN extends BaseOperator<iBoolean, ByteTag> {
  static override internalName =
    "integrateddynamics:nbt_from_iBoolean" as const;
  static override numericID = 258;
  static override nicknames = [
    "booleanAsNbt",
    "fromBoolean",
    "nbtFromBoolean",
    "boolean_as_nbt",
    "from_boolean",
    "nbt_from_boolean",
  ];
  static override symbol = "NBT.from_iBoolean";
  static override interactName = "booleanAsNbt";
  static override operatorName = "from_boolean" as const;
  static override displayName = "NBT Byte From Boolean" as const;
  static override fullDisplayName = "NBT NBT Byte From Boolean" as const;
  static override tooltipInfo =
    "Create an NBT Byte tag from the given Boolean value" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
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
