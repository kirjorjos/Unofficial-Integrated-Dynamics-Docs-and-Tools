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
  static override nicknames = [
    "nbtUnion",
    "nbtCompoundUnion",
    "NBTUnion",
    "compound_union",
    "nbtCompound_union",
  ];
  static override symbol = "NBT{}.∪";
  static override interactName = "nbtUnion";
  static override operatorName = "compound_union" as const;
  static override displayName = "NBT Compound Union" as const;
  static override fullDisplayName = "NBT NBT Compound Union" as const;
  static override tooltipInfo =
    "The union of the given NBT compound tags. Nested tags will be joined recusively." as const;

  static override kind = "nbt" as const;
  static override renderPattern = "INFIX_LONG" as const;
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
