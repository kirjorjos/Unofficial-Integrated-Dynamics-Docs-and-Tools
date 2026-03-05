import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

export class OPERATOR_PARSE_NBT extends BaseOperator<iString, CompoundTag> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.nbt" as const;
  constructor() {
    super({
      nicknames: ["parseNBT"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "NBT",
        },
      }),
      symbol: "parse_nbt",
      interactName: "stringParseAsNbt",
      function: (data: iString): CompoundTag => {
        return CompoundTag.fromJSON(data.valueOf());
      },
    });
  }
}
