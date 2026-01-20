import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_UNION extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, CompoundTag>
> {
    static override internalName = "integrateddynamics:nbt_compound_union"
  constructor() {
    super({
      nicknames: ["nbtCompoundUnion", "NBTUnion"],
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
      symbol: "NBT{}.∪",
      interactName: "nbtUnion",
      function: (nbt1: CompoundTag): TypeLambda<CompoundTag, CompoundTag> => {
        return (nbt2: CompoundTag): CompoundTag => {
          return nbt1.compoundUnion(nbt2);
        };
      },
    });
  }
}
