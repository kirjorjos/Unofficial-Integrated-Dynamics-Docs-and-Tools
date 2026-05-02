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
    "nbtCompound_keys",
  ];
  static override symbol = "NBT{}.keys";
  static override interactName = "nbtKeys";
  static override operatorName = "compound_keys" as const;
  static override displayName = "NBT Compound Keys" as const;
  static override fullDisplayName = "NBT NBT Compound Keys" as const;
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
