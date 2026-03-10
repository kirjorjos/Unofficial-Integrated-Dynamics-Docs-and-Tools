import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_INTERSECTION extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, CompoundTag>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_intersection" as const;
  static override nicknames = [
    "nbtIntersection",
    "nbtCompoundIntersection",
    "NBTIntersection",
  ];
  static override symbol = "NBT{}.∩";
  static override interactName = "nbtIntersection";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
      function: (nbt1: CompoundTag) => {
        return (nbt2: CompoundTag) => {
          return nbt1.compoundIntersection(nbt2);
        };
      },
    });
  }
}
