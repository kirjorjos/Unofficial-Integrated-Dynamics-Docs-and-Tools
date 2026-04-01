import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

export class OPERATOR_PARSE_NBT extends BaseOperator<iString, CompoundTag> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.nbt" as const;
  static override numericID = 196;
  static override nicknames = [
    "stringParseAsNbt",
    "parseNBT",
    "parse_nbt",
    "parseParse_nbt",
  ];
  static override symbol = "parse_nbt";
  static override interactName = "stringParseAsNbt";
  static override operatorName = "parse_nbt" as const;
  static override kind = "parse" as const;
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
      function: (data: iString): CompoundTag => {
        return CompoundTag.fromJSON(data.valueOf());
      },
    });
  }
}
