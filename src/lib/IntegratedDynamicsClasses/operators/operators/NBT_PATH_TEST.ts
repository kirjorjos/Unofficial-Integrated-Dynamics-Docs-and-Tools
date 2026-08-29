import { NbtPath } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_NBT_PATH_TEST extends BaseOperator<
  iString,
  Operator<CompoundTag, iBoolean>
> {
  static override internalName = "integrateddynamics:nbt_path_test" as const;
  static override numericID = 240;
  static override nicknames = [
    "nbtPathTest",
    "NBTPathTest",
    "pathTest",
    "stringNbtPathTest",
    "n_b_t_path_test",
    "path_test",
    "string_nbt_path_test",
  ];
  static override symbol = "NBT.path_test";
  static override interactName = "stringNbtPathTest";
  static override operatorName = "path_test" as const;
  static override displayName = "NBT Path Test" as const;
  static override fullDisplayName = "NBT NBT Path Test" as const;
  static override stringDisplayNames = [
    "nbt path test",
    "nbt path Test",
    "nbt Path test",
    "nbt Path Test",
    "Nbt path test",
    "Nbt path Test",
    "Nbt Path test",
    "Nbt Path Test",
    "NBT path test",
    "NBT path Test",
    "NBT Path test",
    "NBT Path Test",
    "nbt nbt path test",
    "nbt nbt path Test",
    "nbt nbt Path test",
    "nbt nbt Path Test",
    "nbt Nbt path test",
    "nbt Nbt path Test",
    "nbt Nbt Path test",
    "nbt Nbt Path Test",
    "Nbt nbt path test",
    "Nbt nbt path Test",
    "Nbt nbt Path test",
    "Nbt nbt Path Test",
    "Nbt Nbt path test",
    "Nbt Nbt path Test",
    "Nbt Nbt Path test",
    "Nbt Nbt Path Test",
    "nbt NBT path test",
    "nbt NBT path Test",
    "nbt NBT Path test",
    "nbt NBT Path Test",
    "Nbt NBT path test",
    "Nbt NBT path Test",
    "Nbt NBT Path test",
    "Nbt NBT Path Test",
    "NBT nbt path test",
    "NBT nbt path Test",
    "NBT nbt Path test",
    "NBT nbt Path Test",
    "NBT Nbt path test",
    "NBT Nbt path Test",
    "NBT Nbt Path test",
    "NBT Nbt Path Test",
    "NBT NBT path test",
    "NBT NBT path Test",
    "NBT NBT Path test",
    "NBT NBT Path Test",
  ];
  static override tooltipInfo =
    "Test if the given NBT Path expression matches with the given NBT value" as const;

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
          if (!expression) throw new iError(`Invalid path: ${path.valueOf()}`);
          return new iBoolean(expression.test(nbt));
        };
      },
    });
  }
}
