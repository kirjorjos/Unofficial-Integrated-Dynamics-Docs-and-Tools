import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_MINUS extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, CompoundTag>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_minus",
      nicknames: ["nbtCompoundMinus", "NBTMinus"],
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
        globalMap
      ),
      symbol: "NBT{}.∖",
      interactName: "nbtMinus",
      function: (nbt1: CompoundTag) => {
        return (nbt2: CompoundTag) => {
          return nbt1.compoundMinus(nbt2);
        };
      },
    });
  }
}
