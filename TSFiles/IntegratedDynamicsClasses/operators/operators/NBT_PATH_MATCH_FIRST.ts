import { globalMap } from "HelperClasses/TypeMap";
import { NbtPath } from "IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_PATH_MATCH_FIRST extends BaseOperator<
  iString,
  Operator<CompoundTag, Tag<IntegratedValue>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_path_match_first",
      nicknames: ["nbtPathMatchFirst"],
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
        globalMap
      ),
      symbol: "NBT.path_match_first",
      interactName: "stringNbtPathMatchFirst",
      function: (
        path: iString
      ): TypeLambda<CompoundTag, Tag<IntegratedValue>> => {
        return (nbt: CompoundTag): Tag<IntegratedValue> => {
          let expression = NbtPath.parse(path.valueOf());
          if (!expression) throw new Error(`Invalid path: ${path.valueOf()}`);
          return expression.match(nbt).getMatches()[0] ?? new NullTag();
        };
      },
    });
  }
}
