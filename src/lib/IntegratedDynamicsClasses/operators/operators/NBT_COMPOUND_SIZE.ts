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
  static override nicknames = ["nbtSize", "nbtCompoundSize", "NBTSize"];
  static override symbol = "NBT{}.size";
  static override interactName = "nbtSize";
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
