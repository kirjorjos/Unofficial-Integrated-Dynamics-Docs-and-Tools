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
    "nbtMinus",
    "nbtCompoundMinus",
    "NBTMinus",
    "compound_minus",
    "nbtCompound_minus",
  ];
  static override symbol = "NBT{}.∖";
  static override interactName = "nbtMinus";
  static override operatorName = "compound_minus" as const;
  static override displayName = "NBT Compound Minus" as const;
  static override fullDisplayName = "NBT NBT Compound Minus" as const;
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
