import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_INTERSECTION extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, CompoundTag>
> {
    static override internalName = "integrateddynamics:nbt_compound_intersection"
  constructor() {
    super({
      nicknames: ["nbtCompoundIntersection", "NBTIntersection"],
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
      symbol: "NBT{}.∩",
      interactName: "nbtIntersection",
      function: (nbt1: CompoundTag) => {
        return (nbt2: CompoundTag) => {
          return nbt1.compoundIntersection(nbt2);
        };
      },
    });
  }
}
