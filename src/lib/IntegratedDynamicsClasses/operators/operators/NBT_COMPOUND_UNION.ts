import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_UNION extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, CompoundTag>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_union" as const;
  static override numericID = 214;
  static override nicknames = ["nbtUnion", "nbtCompoundUnion", "NBTUnion"];
  static override symbol = "NBT{}.∪";
  static override interactName = "nbtUnion";
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
              type: "NBT",
            },
          },
        },
        normalizeSignature
      ),
      function: (nbt1: CompoundTag): TypeLambda<CompoundTag, CompoundTag> => {
        return (nbt2: CompoundTag): CompoundTag => {
          return nbt1.compoundUnion(nbt2);
        };
      },
    });
  }
}
