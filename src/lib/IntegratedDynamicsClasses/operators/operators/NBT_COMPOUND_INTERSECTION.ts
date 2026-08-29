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
    "compoundIntersection",
    "nbtCompoundIntersection",
    "nbtIntersection",
    "NBTIntersection",
    "compound_intersection",
    "nbt_compound_intersection",
    "nbt_intersection",
  ];
  static override symbol = "NBT{}.∩";
  static override interactName = "nbtIntersection";
  static override operatorName = "compound_intersection" as const;
  static override displayName = "NBT Compound Intersection" as const;
  static override fullDisplayName = "NBT NBT Compound Intersection" as const;
  static override stringDisplayNames = [
    "nbt compound intersection",
    "nbt compound Intersection",
    "nbt Compound intersection",
    "nbt Compound Intersection",
    "Nbt compound intersection",
    "Nbt compound Intersection",
    "Nbt Compound intersection",
    "Nbt Compound Intersection",
    "NBT compound intersection",
    "NBT compound Intersection",
    "NBT Compound intersection",
    "NBT Compound Intersection",
    "nbt nbt compound intersection",
    "nbt nbt compound Intersection",
    "nbt nbt Compound intersection",
    "nbt nbt Compound Intersection",
    "nbt Nbt compound intersection",
    "nbt Nbt compound Intersection",
    "nbt Nbt Compound intersection",
    "nbt Nbt Compound Intersection",
    "Nbt nbt compound intersection",
    "Nbt nbt compound Intersection",
    "Nbt nbt Compound intersection",
    "Nbt nbt Compound Intersection",
    "Nbt Nbt compound intersection",
    "Nbt Nbt compound Intersection",
    "Nbt Nbt Compound intersection",
    "Nbt Nbt Compound Intersection",
    "nbt NBT compound intersection",
    "nbt NBT compound Intersection",
    "nbt NBT Compound intersection",
    "nbt NBT Compound Intersection",
    "Nbt NBT compound intersection",
    "Nbt NBT compound Intersection",
    "Nbt NBT Compound intersection",
    "Nbt NBT Compound Intersection",
    "NBT nbt compound intersection",
    "NBT nbt compound Intersection",
    "NBT nbt Compound intersection",
    "NBT nbt Compound Intersection",
    "NBT Nbt compound intersection",
    "NBT Nbt compound Intersection",
    "NBT Nbt Compound intersection",
    "NBT Nbt Compound Intersection",
    "NBT NBT compound intersection",
    "NBT NBT compound Intersection",
    "NBT NBT Compound intersection",
    "NBT NBT Compound Intersection",
  ];
  static override tooltipInfo =
    "The intersection of the given NBT compound tags. Nested tags will be intersected recusively." as const;

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
