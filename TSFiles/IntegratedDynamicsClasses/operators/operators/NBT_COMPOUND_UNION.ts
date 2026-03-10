import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_UNION extends BaseOperator<
  CompoundTag,
  Operator<CompoundTag, CompoundTag>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_union" as const;
  static override nicknames = ["nbtUnion", "nbtCompoundUnion", "NBTUnion"];
  static override symbol = "NBT{}.∪";
  static override interactName = "nbtUnion";
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
      function: (nbt1: CompoundTag): TypeLambda<CompoundTag, CompoundTag> => {
        return (nbt2: CompoundTag): CompoundTag => {
          return nbt1.compoundUnion(nbt2);
        };
      },
    });
  }
}
