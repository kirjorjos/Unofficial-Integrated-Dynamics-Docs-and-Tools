import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_NBT_COMPOUND_SIZE extends BaseOperator<
  CompoundTag,
  Integer
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_size",
      nicknames: ["nbtCompoundSize", "NBTSize"],
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
        globalMap
      ),
      symbol: "NBT{}.size",
      interactName: "nbtSize",
      function: (nbt: CompoundTag): Integer => {
        return nbt.getAllKeys().size();
      },
    });
  }
}
