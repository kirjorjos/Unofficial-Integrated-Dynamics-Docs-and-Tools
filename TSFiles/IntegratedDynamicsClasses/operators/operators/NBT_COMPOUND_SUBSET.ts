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
  constructor() {
    super({
      nicknames: ["nbtCompoundSubset", "NBTSubset"],
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
      symbol: "NBT{}.⊆",
      interactName: "nbtIsSubset",
      function: (subSet: CompoundTag): TypeLambda<CompoundTag, iBoolean> => {
        return (superSet: CompoundTag): iBoolean => {
          return new iBoolean(superSet.compoundSubset(subSet));
        };
      },
    });
  }
}
