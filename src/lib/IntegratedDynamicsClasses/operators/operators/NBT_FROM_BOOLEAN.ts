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
  static override stringDisplayNames = [
    "nbt byte from boolean",
    "nbt byte from Boolean",
    "nbt byte From boolean",
    "nbt byte From Boolean",
    "nbt Byte from boolean",
    "nbt Byte from Boolean",
    "nbt Byte From boolean",
    "nbt Byte From Boolean",
    "Nbt byte from boolean",
    "Nbt byte from Boolean",
    "Nbt byte From boolean",
    "Nbt byte From Boolean",
    "Nbt Byte from boolean",
    "Nbt Byte from Boolean",
    "Nbt Byte From boolean",
    "Nbt Byte From Boolean",
    "NBT byte from boolean",
    "NBT byte from Boolean",
    "NBT byte From boolean",
    "NBT byte From Boolean",
    "NBT Byte from boolean",
    "NBT Byte from Boolean",
    "NBT Byte From boolean",
    "NBT Byte From Boolean",
    "nbt nbt byte from boolean",
    "nbt nbt byte from Boolean",
    "nbt nbt byte From boolean",
    "nbt nbt byte From Boolean",
    "nbt nbt Byte from boolean",
    "nbt nbt Byte from Boolean",
    "nbt nbt Byte From boolean",
    "nbt nbt Byte From Boolean",
    "nbt Nbt byte from boolean",
    "nbt Nbt byte from Boolean",
    "nbt Nbt byte From boolean",
    "nbt Nbt byte From Boolean",
    "nbt Nbt Byte from boolean",
    "nbt Nbt Byte from Boolean",
    "nbt Nbt Byte From boolean",
    "nbt Nbt Byte From Boolean",
    "Nbt nbt byte from boolean",
    "Nbt nbt byte from Boolean",
    "Nbt nbt byte From boolean",
    "Nbt nbt byte From Boolean",
    "Nbt nbt Byte from boolean",
    "Nbt nbt Byte from Boolean",
    "Nbt nbt Byte From boolean",
    "Nbt nbt Byte From Boolean",
    "Nbt Nbt byte from boolean",
    "Nbt Nbt byte from Boolean",
    "Nbt Nbt byte From boolean",
    "Nbt Nbt byte From Boolean",
    "Nbt Nbt Byte from boolean",
    "Nbt Nbt Byte from Boolean",
    "Nbt Nbt Byte From boolean",
    "Nbt Nbt Byte From Boolean",
    "nbt NBT byte from boolean",
    "nbt NBT byte from Boolean",
    "nbt NBT byte From boolean",
    "nbt NBT byte From Boolean",
    "nbt NBT Byte from boolean",
    "nbt NBT Byte from Boolean",
    "nbt NBT Byte From boolean",
    "nbt NBT Byte From Boolean",
    "Nbt NBT byte from boolean",
    "Nbt NBT byte from Boolean",
    "Nbt NBT byte From boolean",
    "Nbt NBT byte From Boolean",
    "Nbt NBT Byte from boolean",
    "Nbt NBT Byte from Boolean",
    "Nbt NBT Byte From boolean",
    "Nbt NBT Byte From Boolean",
    "NBT nbt byte from boolean",
    "NBT nbt byte from Boolean",
    "NBT nbt byte From boolean",
    "NBT nbt byte From Boolean",
    "NBT nbt Byte from boolean",
    "NBT nbt Byte from Boolean",
    "NBT nbt Byte From boolean",
    "NBT nbt Byte From Boolean",
    "NBT Nbt byte from boolean",
    "NBT Nbt byte from Boolean",
    "NBT Nbt byte From boolean",
    "NBT Nbt byte From Boolean",
    "NBT Nbt Byte from boolean",
    "NBT Nbt Byte from Boolean",
    "NBT Nbt Byte From boolean",
    "NBT Nbt Byte From Boolean",
    "NBT NBT byte from boolean",
    "NBT NBT byte from Boolean",
    "NBT NBT byte From boolean",
    "NBT NBT byte From Boolean",
    "NBT NBT Byte from boolean",
    "NBT NBT Byte from Boolean",
    "NBT NBT Byte From boolean",
    "NBT NBT Byte From Boolean",
  ];
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
