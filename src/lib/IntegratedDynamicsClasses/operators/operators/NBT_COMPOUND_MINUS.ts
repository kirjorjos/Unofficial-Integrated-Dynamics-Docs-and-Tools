import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_COMPOUND_MINUS extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, CompoundTag>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_minus" as const;
  static override numericID = 210;
  static override nicknames = [
    "compoundMinus",
    "nbtCompoundMinus",
    "nbtMinus",
    "NBTMinus",
    "compound_minus",
    "nbt_compound_minus",
    "nbt_minus",
  ];
  static override symbol = "NBT{}.∖";
  static override interactName = "nbtMinus";
  static override operatorName = "compound_minus" as const;
  static override displayName = "NBT Compound Minus" as const;
  static override fullDisplayName = "NBT NBT Compound Minus" as const;
  static override stringDisplayNames = [
    "nbt compound minus",
    "nbt compound Minus",
    "nbt Compound minus",
    "nbt Compound Minus",
    "Nbt compound minus",
    "Nbt compound Minus",
    "Nbt Compound minus",
    "Nbt Compound Minus",
    "NBT compound minus",
    "NBT compound Minus",
    "NBT Compound minus",
    "NBT Compound Minus",
    "nbt nbt compound minus",
    "nbt nbt compound Minus",
    "nbt nbt Compound minus",
    "nbt nbt Compound Minus",
    "nbt Nbt compound minus",
    "nbt Nbt compound Minus",
    "nbt Nbt Compound minus",
    "nbt Nbt Compound Minus",
    "Nbt nbt compound minus",
    "Nbt nbt compound Minus",
    "Nbt nbt Compound minus",
    "Nbt nbt Compound Minus",
    "Nbt Nbt compound minus",
    "Nbt Nbt compound Minus",
    "Nbt Nbt Compound minus",
    "Nbt Nbt Compound Minus",
    "nbt NBT compound minus",
    "nbt NBT compound Minus",
    "nbt NBT Compound minus",
    "nbt NBT Compound Minus",
    "Nbt NBT compound minus",
    "Nbt NBT compound Minus",
    "Nbt NBT Compound minus",
    "Nbt NBT Compound Minus",
    "NBT nbt compound minus",
    "NBT nbt compound Minus",
    "NBT nbt Compound minus",
    "NBT nbt Compound Minus",
    "NBT Nbt compound minus",
    "NBT Nbt compound Minus",
    "NBT Nbt Compound minus",
    "NBT Nbt Compound Minus",
    "NBT NBT compound minus",
    "NBT NBT compound Minus",
    "NBT NBT Compound minus",
    "NBT NBT Compound Minus",
  ];
  static override tooltipInfo =
    "The difference of the given NBT compound tags. Nested tags will be subtracted recusively." as const;

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
          return nbt1.compoundMinus(nbt2);
        };
      },
    });
  }
}
