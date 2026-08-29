import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_NBT_COMPOUND_KEYS extends BaseOperator<
  CompoundTag,
  iArray<iString>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_keys" as const;
  static override numericID = 209;
  static override nicknames = [
    "compoundKeys",
    "nbtCompoundKeys",
    "nbtKeys",
    "NBTKeys",
    "compound_keys",
    "nbt_compound_keys",
    "nbt_keys",
  ];
  static override symbol = "NBT{}.keys";
  static override interactName = "nbtKeys";
  static override operatorName = "compound_keys" as const;
  static override displayName = "NBT Compound Keys" as const;
  static override fullDisplayName = "NBT NBT Compound Keys" as const;
  static override stringDisplayNames = [
    "nbt compound keys",
    "nbt compound Keys",
    "nbt Compound keys",
    "nbt Compound Keys",
    "Nbt compound keys",
    "Nbt compound Keys",
    "Nbt Compound keys",
    "Nbt Compound Keys",
    "NBT compound keys",
    "NBT compound Keys",
    "NBT Compound keys",
    "NBT Compound Keys",
    "nbt nbt compound keys",
    "nbt nbt compound Keys",
    "nbt nbt Compound keys",
    "nbt nbt Compound Keys",
    "nbt Nbt compound keys",
    "nbt Nbt compound Keys",
    "nbt Nbt Compound keys",
    "nbt Nbt Compound Keys",
    "Nbt nbt compound keys",
    "Nbt nbt compound Keys",
    "Nbt nbt Compound keys",
    "Nbt nbt Compound Keys",
    "Nbt Nbt compound keys",
    "Nbt Nbt compound Keys",
    "Nbt Nbt Compound keys",
    "Nbt Nbt Compound Keys",
    "nbt NBT compound keys",
    "nbt NBT compound Keys",
    "nbt NBT Compound keys",
    "nbt NBT Compound Keys",
    "Nbt NBT compound keys",
    "Nbt NBT compound Keys",
    "Nbt NBT Compound keys",
    "Nbt NBT Compound Keys",
    "NBT nbt compound keys",
    "NBT nbt compound Keys",
    "NBT nbt Compound keys",
    "NBT nbt Compound Keys",
    "NBT Nbt compound keys",
    "NBT Nbt compound Keys",
    "NBT Nbt Compound keys",
    "NBT Nbt Compound Keys",
    "NBT NBT compound keys",
    "NBT NBT compound Keys",
    "NBT NBT Compound keys",
    "NBT NBT Compound Keys",
  ];
  static override tooltipInfo =
    "The list of keys inside the given NBT compound tag" as const;

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
          to: { type: "List", listType: { type: "String" } },
        },
        normalizeSignature
      ),
      function: (nbt: CompoundTag): iArray<iString> => {
        return nbt.getAllKeys();
      },
    });
  }
}
