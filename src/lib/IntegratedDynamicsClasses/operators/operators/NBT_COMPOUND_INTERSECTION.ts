import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_INTERSECTION extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, CompoundTag>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_intersection" as const;
  static override numericID = 208;
  static override nicknames = [
    "nbtIntersection",
    "nbtCompoundIntersection",
    "NBTIntersection",
    "compound_intersection",
    "nbtCompound_intersection",
  ];
  static override symbol = "NBT{}.∩";
  static override interactName = "nbtIntersection";
  static override operatorName = "compound_intersection" as const;
  static override displayName = "NBT Compound Intersection" as const;
  static override fullDisplayName = "NBT NBT Compound Intersection" as const;
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
      function: (nbt1: CompoundTag) => {
        return (nbt2: CompoundTag) => {
          return nbt1.compoundIntersection(nbt2);
        };
      },
    });
  }
}
