import { NbtPath } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_NBT_PATH_TEST extends BaseOperator<
  iString,
  Operator<CompoundTag, iBoolean>
> {
  static override internalName = "integrateddynamics:nbt_path_test" as const;
  static override numericID = 240;
  static override nicknames = [
    "stringNbtPathTest",
    "NBTPathTest",
    "path_test",
    "nbtPath_test",
  ];
  static override symbol = "NBT.path_test";
  static override interactName = "stringNbtPathTest";
  static override operatorName = "path_test" as const;
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
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
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
