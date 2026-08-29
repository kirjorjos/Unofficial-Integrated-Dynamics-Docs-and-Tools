import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_NBT_AS_BOOLEAN extends BaseOperator<ByteTag, iBoolean> {
  static override internalName = "integrateddynamics:nbt_as_iBoolean" as const;
  static override numericID = 246;
  static override nicknames = [
    "asBoolean",
    "nbtAsBoolean",
    "as_boolean",
    "nbt_as_boolean",
  ];
  static override symbol = "NBT.as_iBoolean";
  static override interactName = "nbtAsBoolean";
  static override operatorName = "as_boolean" as const;
  static override displayName = "NBT Boolean As Boolean" as const;
  static override fullDisplayName = "NBT NBT Boolean As Boolean" as const;
  static override stringDisplayNames = [
    "nbt boolean as boolean",
    "nbt boolean as Boolean",
    "nbt boolean As boolean",
    "nbt boolean As Boolean",
    "nbt Boolean as boolean",
    "nbt Boolean as Boolean",
    "nbt Boolean As boolean",
    "nbt Boolean As Boolean",
    "Nbt boolean as boolean",
    "Nbt boolean as Boolean",
    "Nbt boolean As boolean",
    "Nbt boolean As Boolean",
    "Nbt Boolean as boolean",
    "Nbt Boolean as Boolean",
    "Nbt Boolean As boolean",
    "Nbt Boolean As Boolean",
    "NBT boolean as boolean",
    "NBT boolean as Boolean",
    "NBT boolean As boolean",
    "NBT boolean As Boolean",
    "NBT Boolean as boolean",
    "NBT Boolean as Boolean",
    "NBT Boolean As boolean",
    "NBT Boolean As Boolean",
    "nbt nbt boolean as boolean",
    "nbt nbt boolean as Boolean",
    "nbt nbt boolean As boolean",
    "nbt nbt boolean As Boolean",
    "nbt nbt Boolean as boolean",
    "nbt nbt Boolean as Boolean",
    "nbt nbt Boolean As boolean",
    "nbt nbt Boolean As Boolean",
    "nbt Nbt boolean as boolean",
    "nbt Nbt boolean as Boolean",
    "nbt Nbt boolean As boolean",
    "nbt Nbt boolean As Boolean",
    "nbt Nbt Boolean as boolean",
    "nbt Nbt Boolean as Boolean",
    "nbt Nbt Boolean As boolean",
    "nbt Nbt Boolean As Boolean",
    "Nbt nbt boolean as boolean",
    "Nbt nbt boolean as Boolean",
    "Nbt nbt boolean As boolean",
    "Nbt nbt boolean As Boolean",
    "Nbt nbt Boolean as boolean",
    "Nbt nbt Boolean as Boolean",
    "Nbt nbt Boolean As boolean",
    "Nbt nbt Boolean As Boolean",
    "Nbt Nbt boolean as boolean",
    "Nbt Nbt boolean as Boolean",
    "Nbt Nbt boolean As boolean",
    "Nbt Nbt boolean As Boolean",
    "Nbt Nbt Boolean as boolean",
    "Nbt Nbt Boolean as Boolean",
    "Nbt Nbt Boolean As boolean",
    "Nbt Nbt Boolean As Boolean",
    "nbt NBT boolean as boolean",
    "nbt NBT boolean as Boolean",
    "nbt NBT boolean As boolean",
    "nbt NBT boolean As Boolean",
    "nbt NBT Boolean as boolean",
    "nbt NBT Boolean as Boolean",
    "nbt NBT Boolean As boolean",
    "nbt NBT Boolean As Boolean",
    "Nbt NBT boolean as boolean",
    "Nbt NBT boolean as Boolean",
    "Nbt NBT boolean As boolean",
    "Nbt NBT boolean As Boolean",
    "Nbt NBT Boolean as boolean",
    "Nbt NBT Boolean as Boolean",
    "Nbt NBT Boolean As boolean",
    "Nbt NBT Boolean As Boolean",
    "NBT nbt boolean as boolean",
    "NBT nbt boolean as Boolean",
    "NBT nbt boolean As boolean",
    "NBT nbt boolean As Boolean",
    "NBT nbt Boolean as boolean",
    "NBT nbt Boolean as Boolean",
    "NBT nbt Boolean As boolean",
    "NBT nbt Boolean As Boolean",
    "NBT Nbt boolean as boolean",
    "NBT Nbt boolean as Boolean",
    "NBT Nbt boolean As boolean",
    "NBT Nbt boolean As Boolean",
    "NBT Nbt Boolean as boolean",
    "NBT Nbt Boolean as Boolean",
    "NBT Nbt Boolean As boolean",
    "NBT Nbt Boolean As Boolean",
    "NBT NBT boolean as boolean",
    "NBT NBT boolean as Boolean",
    "NBT NBT boolean As boolean",
    "NBT NBT boolean As Boolean",
    "NBT NBT Boolean as boolean",
    "NBT NBT Boolean as Boolean",
    "NBT NBT Boolean As boolean",
    "NBT NBT Boolean As Boolean",
  ];
  static override tooltipInfo =
    "Get the Boolean value of the given NBT Byte tag" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (nbt: ByteTag): iBoolean => {
        if (nbt.getType() === Tag.TAG_BYTE) {
          return new iBoolean(!!nbt.valueOf().toJSNumber());
        } else {
          return new iBoolean(false);
        }
      },
    });
  }
}
