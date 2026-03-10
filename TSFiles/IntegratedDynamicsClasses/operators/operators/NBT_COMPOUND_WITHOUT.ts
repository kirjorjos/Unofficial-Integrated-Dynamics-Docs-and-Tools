import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITHOUT extends BaseOperator<
  CompoundTag,
  Operator<iString, CompoundTag>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_without" as const;
  static override nicknames = [
    "nbtWithout",
    "nbtCompoundWithout",
    "NBTWithout",
  ];
  static override symbol = "NBT{}.without";
  static override interactName = "nbtWithout";
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
      function: (nbt: CompoundTag): TypeLambda<iString, CompoundTag> => {
        return (key: iString): CompoundTag => {
          return nbt.without(key.valueOf());
        };
      },
    });
  }
}
