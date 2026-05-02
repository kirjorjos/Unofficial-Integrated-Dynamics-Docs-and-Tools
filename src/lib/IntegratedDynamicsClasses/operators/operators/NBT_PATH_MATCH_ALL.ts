import { NbtPath } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_NBT_PATH_MATCH_ALL extends BaseOperator<
  iString,
  Operator<CompoundTag, iArray<Tag<IntegratedValue>>>
> {
  static override internalName =
    "integrateddynamics:nbt_path_match_all" as const;
  static override numericID = 238;
  static override nicknames = [
    "nbtPathMatchAll",
    "pathMatchAll",
    "stringNbtPathMatchAll",
    "nbt_path_match_all",
    "path_match_all",
    "string_nbt_path_match_all",
  ];
  static override symbol = "NBT.path_match_all";
  static override interactName = "stringNbtPathMatchAll";
  static override operatorName = "path_match_all" as const;
  static override displayName = "NBT Path Match All" as const;
  static override fullDisplayName = "NBT NBT Path Match All" as const;
  static override tooltipInfo =
    "Apply the given NBT Path expression on the given NBT value, and return all matches as a list" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "INFIX_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
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
        },
        normalizeSignature
      ),
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
