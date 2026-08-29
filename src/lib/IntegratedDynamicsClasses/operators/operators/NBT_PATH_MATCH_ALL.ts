import { NbtPath } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

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
  static override stringDisplayNames = [
    "nbt path match all",
    "nbt path match All",
    "nbt path Match all",
    "nbt path Match All",
    "nbt Path match all",
    "nbt Path match All",
    "nbt Path Match all",
    "nbt Path Match All",
    "Nbt path match all",
    "Nbt path match All",
    "Nbt path Match all",
    "Nbt path Match All",
    "Nbt Path match all",
    "Nbt Path match All",
    "Nbt Path Match all",
    "Nbt Path Match All",
    "NBT path match all",
    "NBT path match All",
    "NBT path Match all",
    "NBT path Match All",
    "NBT Path match all",
    "NBT Path match All",
    "NBT Path Match all",
    "NBT Path Match All",
    "nbt nbt path match all",
    "nbt nbt path match All",
    "nbt nbt path Match all",
    "nbt nbt path Match All",
    "nbt nbt Path match all",
    "nbt nbt Path match All",
    "nbt nbt Path Match all",
    "nbt nbt Path Match All",
    "nbt Nbt path match all",
    "nbt Nbt path match All",
    "nbt Nbt path Match all",
    "nbt Nbt path Match All",
    "nbt Nbt Path match all",
    "nbt Nbt Path match All",
    "nbt Nbt Path Match all",
    "nbt Nbt Path Match All",
    "Nbt nbt path match all",
    "Nbt nbt path match All",
    "Nbt nbt path Match all",
    "Nbt nbt path Match All",
    "Nbt nbt Path match all",
    "Nbt nbt Path match All",
    "Nbt nbt Path Match all",
    "Nbt nbt Path Match All",
    "Nbt Nbt path match all",
    "Nbt Nbt path match All",
    "Nbt Nbt path Match all",
    "Nbt Nbt path Match All",
    "Nbt Nbt Path match all",
    "Nbt Nbt Path match All",
    "Nbt Nbt Path Match all",
    "Nbt Nbt Path Match All",
    "nbt NBT path match all",
    "nbt NBT path match All",
    "nbt NBT path Match all",
    "nbt NBT path Match All",
    "nbt NBT Path match all",
    "nbt NBT Path match All",
    "nbt NBT Path Match all",
    "nbt NBT Path Match All",
    "Nbt NBT path match all",
    "Nbt NBT path match All",
    "Nbt NBT path Match all",
    "Nbt NBT path Match All",
    "Nbt NBT Path match all",
    "Nbt NBT Path match All",
    "Nbt NBT Path Match all",
    "Nbt NBT Path Match All",
    "NBT nbt path match all",
    "NBT nbt path match All",
    "NBT nbt path Match all",
    "NBT nbt path Match All",
    "NBT nbt Path match all",
    "NBT nbt Path match All",
    "NBT nbt Path Match all",
    "NBT nbt Path Match All",
    "NBT Nbt path match all",
    "NBT Nbt path match All",
    "NBT Nbt path Match all",
    "NBT Nbt path Match All",
    "NBT Nbt Path match all",
    "NBT Nbt Path match All",
    "NBT Nbt Path Match all",
    "NBT Nbt Path Match All",
    "NBT NBT path match all",
    "NBT NBT path match All",
    "NBT NBT path Match all",
    "NBT NBT path Match All",
    "NBT NBT Path match all",
    "NBT NBT Path match All",
    "NBT NBT Path Match all",
    "NBT NBT Path Match All",
  ];
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
          if (!expression) throw new iError(`Invalid path: ${path.valueOf()}`);
          return new iArrayEager(expression.match(nbt).getMatches());
        };
      },
    });
  }
}
