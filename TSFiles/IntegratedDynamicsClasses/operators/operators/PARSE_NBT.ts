import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

export class OPERATOR_PARSE_NBT extends BaseOperator<iString, CompoundTag> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.nbt" as const;
  static override nicknames = ["stringParseAsNbt", "parseNBT"];
  static override symbol = "parse_nbt";
  static override interactName = "stringParseAsNbt";
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
