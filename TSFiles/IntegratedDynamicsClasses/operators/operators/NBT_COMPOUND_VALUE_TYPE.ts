import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_TYPE extends BaseOperator<
  CompoundTag,
  Operator<iString, iString>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_type" as const;
  constructor() {
    super({
      nicknames: ["nbtCompoundValueType", "NBTValueType"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "NBT",
        },
        to: {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "String",
          },
        },
      }),
      symbol: "NBT{}.type",
      interactName: "nbtType",
      function: (nbt: CompoundTag): TypeLambda<iString, iString> => {
        return (key: iString): iString => {
          if (!nbt.has(key)) {
            return new iString("null");
          }
          return nbt.get(key).getTypeAsString();
        };
      },
    });
  }
}
