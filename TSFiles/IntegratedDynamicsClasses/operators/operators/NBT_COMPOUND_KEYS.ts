import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_NBT_COMPOUND_KEYS extends BaseOperator<
  CompoundTag,
  iArray<iString>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_keys" as const;
  constructor() {
    super({
      nicknames: ["nbtCompoundKeys", "NBTKeys"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "NBT",
        },
        to: { type: "List", listType: { type: "String" } },
      }),
      symbol: "NBT{}.keys",
      interactName: "nbtKeys",
      function: (nbt: CompoundTag): iArray<iString> => {
        return nbt.getAllKeys();
      },
    });
  }
}
