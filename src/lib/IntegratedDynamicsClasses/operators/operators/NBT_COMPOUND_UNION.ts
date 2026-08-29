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
    "compoundUnion",
    "nbtCompoundUnion",
    "nbtUnion",
    "NBTUnion",
    "compound_union",
    "nbt_compound_union",
    "nbt_union",
  ];
  static override symbol = "NBT{}.∪";
  static override interactName = "nbtUnion";
  static override operatorName = "compound_union" as const;
  static override displayName = "NBT Compound Union" as const;
  static override fullDisplayName = "NBT NBT Compound Union" as const;
  static override stringDisplayNames = [
    "nbt compound union",
    "nbt compound Union",
    "nbt Compound union",
    "nbt Compound Union",
    "Nbt compound union",
    "Nbt compound Union",
    "Nbt Compound union",
    "Nbt Compound Union",
    "NBT compound union",
    "NBT compound Union",
    "NBT Compound union",
    "NBT Compound Union",
    "nbt nbt compound union",
    "nbt nbt compound Union",
    "nbt nbt Compound union",
    "nbt nbt Compound Union",
    "nbt Nbt compound union",
    "nbt Nbt compound Union",
    "nbt Nbt Compound union",
    "nbt Nbt Compound Union",
    "Nbt nbt compound union",
    "Nbt nbt compound Union",
    "Nbt nbt Compound union",
    "Nbt nbt Compound Union",
    "Nbt Nbt compound union",
    "Nbt Nbt compound Union",
    "Nbt Nbt Compound union",
    "Nbt Nbt Compound Union",
    "nbt NBT compound union",
    "nbt NBT compound Union",
    "nbt NBT Compound union",
    "nbt NBT Compound Union",
    "Nbt NBT compound union",
    "Nbt NBT compound Union",
    "Nbt NBT Compound union",
    "Nbt NBT Compound Union",
    "NBT nbt compound union",
    "NBT nbt compound Union",
    "NBT nbt Compound union",
    "NBT nbt Compound Union",
    "NBT Nbt compound union",
    "NBT Nbt compound Union",
    "NBT Nbt Compound union",
    "NBT Nbt Compound Union",
    "NBT NBT compound union",
    "NBT NBT compound Union",
    "NBT NBT Compound union",
    "NBT NBT Compound Union",
  ];
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
