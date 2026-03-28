import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_SUBSET extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, iBoolean>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_subset" as const;
  static override numericID = 212;
  static override nicknames = ["nbtIsSubset", "nbtCompoundSubset", "NBTSubset"];
  static override symbol = "NBT{}.⊆";
  static override interactName = "nbtIsSubset";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
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
        },
        normalizeSignature
      ),
      function: (subSet: CompoundTag): TypeLambda<CompoundTag, iBoolean> => {
        return (superSet: CompoundTag): iBoolean => {
          return new iBoolean(superSet.compoundSubset(subSet));
        };
      },
    });
  }
}
