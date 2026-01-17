import { globalMap } from "HelperClasses/TypeMap";
import { NbtPath } from "IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";

export class OPERATOR_NBT_PATH_TEST extends BaseOperator<
  iString,
  Operator<CompoundTag, iBoolean>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_path_test",
      nicknames: ["NBTPathTest"],
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
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT.path_test",
      interactName: "stringNbtPathTest",
      function: (path: iString): TypeLambda<CompoundTag, iBoolean> => {
        return (nbt: CompoundTag): iBoolean => {
          let expression = NbtPath.parse(path.valueOf());
          if (!expression) throw new Error(`Invalid path: ${path.valueOf()}`);
          return new iBoolean(expression.test(nbt));
        };
      },
    });
  }
}
