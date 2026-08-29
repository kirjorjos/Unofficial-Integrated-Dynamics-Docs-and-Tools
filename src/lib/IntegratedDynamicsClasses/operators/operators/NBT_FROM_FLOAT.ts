import { FloatTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Double } from "lib/JavaNumberClasses/Double";

export class OPERATOR_NBT_FROM_FLOAT extends BaseOperator<Double, FloatTag> {
  static override internalName = "integrateddynamics:nbt_from_float" as const;
  static override numericID = 257;
  static override nicknames = [
    "floatAsNbt",
    "fromFloat",
    "nbtFromFloat",
    "float_as_nbt",
    "from_float",
    "nbt_from_float",
  ];
  static override symbol = "NBT.from_float";
  static override interactName = "floatAsNbt";
  static override operatorName = "from_float" as const;
  static override displayName = "NBT Float From Double" as const;
  static override fullDisplayName = "NBT NBT Float From Double" as const;
  static override stringDisplayNames = [
    "nbt float from double",
    "nbt float from Double",
    "nbt float From double",
    "nbt float From Double",
    "nbt Float from double",
    "nbt Float from Double",
    "nbt Float From double",
    "nbt Float From Double",
    "Nbt float from double",
    "Nbt float from Double",
    "Nbt float From double",
    "Nbt float From Double",
    "Nbt Float from double",
    "Nbt Float from Double",
    "Nbt Float From double",
    "Nbt Float From Double",
    "NBT float from double",
    "NBT float from Double",
    "NBT float From double",
    "NBT float From Double",
    "NBT Float from double",
    "NBT Float from Double",
    "NBT Float From double",
    "NBT Float From Double",
    "nbt nbt float from double",
    "nbt nbt float from Double",
    "nbt nbt float From double",
    "nbt nbt float From Double",
    "nbt nbt Float from double",
    "nbt nbt Float from Double",
    "nbt nbt Float From double",
    "nbt nbt Float From Double",
    "nbt Nbt float from double",
    "nbt Nbt float from Double",
    "nbt Nbt float From double",
    "nbt Nbt float From Double",
    "nbt Nbt Float from double",
    "nbt Nbt Float from Double",
    "nbt Nbt Float From double",
    "nbt Nbt Float From Double",
    "Nbt nbt float from double",
    "Nbt nbt float from Double",
    "Nbt nbt float From double",
    "Nbt nbt float From Double",
    "Nbt nbt Float from double",
    "Nbt nbt Float from Double",
    "Nbt nbt Float From double",
    "Nbt nbt Float From Double",
    "Nbt Nbt float from double",
    "Nbt Nbt float from Double",
    "Nbt Nbt float From double",
    "Nbt Nbt float From Double",
    "Nbt Nbt Float from double",
    "Nbt Nbt Float from Double",
    "Nbt Nbt Float From double",
    "Nbt Nbt Float From Double",
    "nbt NBT float from double",
    "nbt NBT float from Double",
    "nbt NBT float From double",
    "nbt NBT float From Double",
    "nbt NBT Float from double",
    "nbt NBT Float from Double",
    "nbt NBT Float From double",
    "nbt NBT Float From Double",
    "Nbt NBT float from double",
    "Nbt NBT float from Double",
    "Nbt NBT float From double",
    "Nbt NBT float From Double",
    "Nbt NBT Float from double",
    "Nbt NBT Float from Double",
    "Nbt NBT Float From double",
    "Nbt NBT Float From Double",
    "NBT nbt float from double",
    "NBT nbt float from Double",
    "NBT nbt float From double",
    "NBT nbt float From Double",
    "NBT nbt Float from double",
    "NBT nbt Float from Double",
    "NBT nbt Float From double",
    "NBT nbt Float From Double",
    "NBT Nbt float from double",
    "NBT Nbt float from Double",
    "NBT Nbt float From double",
    "NBT Nbt float From Double",
    "NBT Nbt Float from double",
    "NBT Nbt Float from Double",
    "NBT Nbt Float From double",
    "NBT Nbt Float From Double",
    "NBT NBT float from double",
    "NBT NBT float from Double",
    "NBT NBT float From double",
    "NBT NBT float From Double",
    "NBT NBT Float from double",
    "NBT NBT Float from Double",
    "NBT NBT Float From double",
    "NBT NBT Float From Double",
  ];
  static override tooltipInfo =
    "Create an NBT Double tag from the given Float value" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (float: Double): FloatTag => {
        return new FloatTag(float);
      },
    });
  }
}
