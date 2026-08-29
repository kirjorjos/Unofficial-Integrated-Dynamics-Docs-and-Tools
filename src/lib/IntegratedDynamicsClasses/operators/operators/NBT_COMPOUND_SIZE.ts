import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_NBT_COMPOUND_SIZE extends BaseOperator<
  CompoundTag,
  Integer
> {
  static override internalName =
    "integrateddynamics:nbt_compound_size" as const;
  static override numericID = 211;
  static override nicknames = [
    "compoundSize",
    "nbtCompoundSize",
    "nbtSize",
    "NBTSize",
    "compound_size",
    "nbt_compound_size",
    "nbt_size",
  ];
  static override symbol = "NBT{}.size";
  static override interactName = "nbtSize";
  static override operatorName = "compound_size" as const;
  static override displayName = "NBT Compound Size" as const;
  static override fullDisplayName = "NBT NBT Compound Size" as const;
  static override stringDisplayNames = [
    "nbt compound size",
    "nbt compound Size",
    "nbt Compound size",
    "nbt Compound Size",
    "Nbt compound size",
    "Nbt compound Size",
    "Nbt Compound size",
    "Nbt Compound Size",
    "NBT compound size",
    "NBT compound Size",
    "NBT Compound size",
    "NBT Compound Size",
    "nbt nbt compound size",
    "nbt nbt compound Size",
    "nbt nbt Compound size",
    "nbt nbt Compound Size",
    "nbt Nbt compound size",
    "nbt Nbt compound Size",
    "nbt Nbt Compound size",
    "nbt Nbt Compound Size",
    "Nbt nbt compound size",
    "Nbt nbt compound Size",
    "Nbt nbt Compound size",
    "Nbt nbt Compound Size",
    "Nbt Nbt compound size",
    "Nbt Nbt compound Size",
    "Nbt Nbt Compound size",
    "Nbt Nbt Compound Size",
    "nbt NBT compound size",
    "nbt NBT compound Size",
    "nbt NBT Compound size",
    "nbt NBT Compound Size",
    "Nbt NBT compound size",
    "Nbt NBT compound Size",
    "Nbt NBT Compound size",
    "Nbt NBT Compound Size",
    "NBT nbt compound size",
    "NBT nbt compound Size",
    "NBT nbt Compound size",
    "NBT nbt Compound Size",
    "NBT Nbt compound size",
    "NBT Nbt compound Size",
    "NBT Nbt Compound size",
    "NBT Nbt Compound Size",
    "NBT NBT compound size",
    "NBT NBT compound Size",
    "NBT NBT Compound size",
    "NBT NBT Compound Size",
  ];
  static override tooltipInfo =
    "The number of entries inside the given NBT compound tag" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (nbt: CompoundTag): Integer => {
        return nbt.getAllKeys().size();
      },
    });
  }
}
