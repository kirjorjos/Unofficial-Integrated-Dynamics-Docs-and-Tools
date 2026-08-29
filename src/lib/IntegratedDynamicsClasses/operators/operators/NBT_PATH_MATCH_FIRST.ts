import { NbtPath } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_NBT_PATH_MATCH_FIRST extends BaseOperator<
  iString,
  Operator<CompoundTag, Tag<IntegratedValue>>
> {
  static override internalName =
    "integrateddynamics:nbt_path_match_first" as const;
  static override numericID = 239;
  static override nicknames = [
    "nbtPathMatchFirst",
    "pathMatchFirst",
    "stringNbtPathMatchFirst",
    "nbt_path_match_first",
    "path_match_first",
    "string_nbt_path_match_first",
  ];
  static override symbol = "NBT.path_match_first";
  static override interactName = "stringNbtPathMatchFirst";
  static override operatorName = "path_match_first" as const;
  static override displayName = "NBT Path Match First" as const;
  static override fullDisplayName = "NBT NBT Path Match First" as const;
  static override stringDisplayNames = [
    "nbt path match first",
    "nbt path match First",
    "nbt path Match first",
    "nbt path Match First",
    "nbt Path match first",
    "nbt Path match First",
    "nbt Path Match first",
    "nbt Path Match First",
    "Nbt path match first",
    "Nbt path match First",
    "Nbt path Match first",
    "Nbt path Match First",
    "Nbt Path match first",
    "Nbt Path match First",
    "Nbt Path Match first",
    "Nbt Path Match First",
    "NBT path match first",
    "NBT path match First",
    "NBT path Match first",
    "NBT path Match First",
    "NBT Path match first",
    "NBT Path match First",
    "NBT Path Match first",
    "NBT Path Match First",
    "nbt nbt path match first",
    "nbt nbt path match First",
    "nbt nbt path Match first",
    "nbt nbt path Match First",
    "nbt nbt Path match first",
    "nbt nbt Path match First",
    "nbt nbt Path Match first",
    "nbt nbt Path Match First",
    "nbt Nbt path match first",
    "nbt Nbt path match First",
    "nbt Nbt path Match first",
    "nbt Nbt path Match First",
    "nbt Nbt Path match first",
    "nbt Nbt Path match First",
    "nbt Nbt Path Match first",
    "nbt Nbt Path Match First",
    "Nbt nbt path match first",
    "Nbt nbt path match First",
    "Nbt nbt path Match first",
    "Nbt nbt path Match First",
    "Nbt nbt Path match first",
    "Nbt nbt Path match First",
    "Nbt nbt Path Match first",
    "Nbt nbt Path Match First",
    "Nbt Nbt path match first",
    "Nbt Nbt path match First",
    "Nbt Nbt path Match first",
    "Nbt Nbt path Match First",
    "Nbt Nbt Path match first",
    "Nbt Nbt Path match First",
    "Nbt Nbt Path Match first",
    "Nbt Nbt Path Match First",
    "nbt NBT path match first",
    "nbt NBT path match First",
    "nbt NBT path Match first",
    "nbt NBT path Match First",
    "nbt NBT Path match first",
    "nbt NBT Path match First",
    "nbt NBT Path Match first",
    "nbt NBT Path Match First",
    "Nbt NBT path match first",
    "Nbt NBT path match First",
    "Nbt NBT path Match first",
    "Nbt NBT path Match First",
    "Nbt NBT Path match first",
    "Nbt NBT Path match First",
    "Nbt NBT Path Match first",
    "Nbt NBT Path Match First",
    "NBT nbt path match first",
    "NBT nbt path match First",
    "NBT nbt path Match first",
    "NBT nbt path Match First",
    "NBT nbt Path match first",
    "NBT nbt Path match First",
    "NBT nbt Path Match first",
    "NBT nbt Path Match First",
    "NBT Nbt path match first",
    "NBT Nbt path match First",
    "NBT Nbt path Match first",
    "NBT Nbt path Match First",
    "NBT Nbt Path match first",
    "NBT Nbt Path match First",
    "NBT Nbt Path Match first",
    "NBT Nbt Path Match First",
    "NBT NBT path match first",
    "NBT NBT path match First",
    "NBT NBT path Match first",
    "NBT NBT path Match First",
    "NBT NBT Path match first",
    "NBT NBT Path match First",
    "NBT NBT Path Match first",
    "NBT NBT Path Match First",
  ];
  static override tooltipInfo =
    "Apply the given NBT Path expression on the given NBT value, and return the first match" as const;

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
            to: {
              type: "NBT",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        path: iString
      ): TypeLambda<CompoundTag, Tag<IntegratedValue>> => {
        return (nbt: CompoundTag): Tag<IntegratedValue> => {
          let expression = NbtPath.parse(path.valueOf());
          if (!expression) throw new iError(`Invalid path: ${path.valueOf()}`);
          return expression.match(nbt).getMatches()[0] ?? new NullTag();
        };
      },
    });
  }
}
