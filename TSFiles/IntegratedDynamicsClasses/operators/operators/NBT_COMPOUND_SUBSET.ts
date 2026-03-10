import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_SUBSET extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, iBoolean>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_subset" as const;
  static override nicknames = ["nbtIsSubset", "nbtCompoundSubset", "NBTSubset"];
  static override symbol = "NBT{}.⊆";
  static override interactName = "nbtIsSubset";
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
            type: "NBT",
          },
          to: {
            type: "Boolean",
          },
        },
      }),
      function: (subSet: CompoundTag): TypeLambda<CompoundTag, iBoolean> => {
        return (superSet: CompoundTag): iBoolean => {
          return new iBoolean(superSet.compoundSubset(subSet));
        };
      },
    });
  }
}
