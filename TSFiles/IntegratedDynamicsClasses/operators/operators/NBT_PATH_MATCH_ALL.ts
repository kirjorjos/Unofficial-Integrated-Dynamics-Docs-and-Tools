import { NbtPath } from "IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "../Operator";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_NBT_PATH_MATCH_ALL extends BaseOperator<
  iString,
  Operator<CompoundTag, iArray<Tag<IntegratedValue>>>
> {
  static override internalName =
    "integrateddynamics:nbt_path_match_all" as const;
  static override nicknames = ["nbtPathMatchAll"];
  static override symbol = "NBT.path_match_all";
  static override interactName = "stringNbtPathMatchAll";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "NBT" } },
        },
      }),
      function: (
        path: iString
      ): TypeLambda<CompoundTag, iArray<Tag<IntegratedValue>>> => {
        return (nbt: CompoundTag): iArray<Tag<IntegratedValue>> => {
          let expression = NbtPath.parse(path.valueOf());
          if (!expression) throw new Error(`Invalid path: ${path.valueOf()}`);
          return new iArrayEager(expression.match(nbt).getMatches());
        };
      },
    });
  }
}
