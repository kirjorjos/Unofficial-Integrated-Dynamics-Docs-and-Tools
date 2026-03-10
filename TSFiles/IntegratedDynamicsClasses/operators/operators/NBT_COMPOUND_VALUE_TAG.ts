import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_TAG extends BaseOperator<
  CompoundTag,
  Operator<iString, Tag<IntegratedValue>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_tag" as const;
  static override nicknames = ["nbtCompoundValueTag", "compoundValueAny"];
  static override symbol = "NBT{}.get_tag";
  static override interactName = "nbtGetTag";
  constructor() {
    super({
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
            type: "NBT",
          },
        },
      }),
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, Tag<IntegratedValue>> => {
        return (key: iString): Tag<IntegratedValue> => {
          return nbt.get(key);
        };
      },
    });
  }
}
