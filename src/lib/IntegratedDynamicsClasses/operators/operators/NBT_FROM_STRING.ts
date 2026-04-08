import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NBT_FROM_STRING extends BaseOperator<iString, StringTag> {
  static override internalName = "integrateddynamics:nbt_from_string" as const;
  static override numericID = 264;
  static override nicknames = [
    "stringAsNbt",
    "nbtFromString",
    "from_string",
    "nbtFrom_string",
  ];
  static override symbol = "NBT.from_string";
  static override interactName = "stringAsNbt";
  static override operatorName = "from_string" as const;
  static override displayName = "NBT String From String" as const;
  static override fullDisplayName = "NBT NBT String From String" as const;
  static override tooltipInfo =
    "Create an NBT String tag from the given String value" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (str: iString): StringTag => {
        return new StringTag(str);
      },
    });
  }
}
