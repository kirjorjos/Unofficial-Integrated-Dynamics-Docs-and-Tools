import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";

export class OPERATOR_OBJECT_BLOCK_WITH_PROPERTIES extends BaseOperator<
  Block,
  Operator<CompoundTag, Block>
> {
  static override internalName =
    "integrateddynamics:block_blockfromproperties" as const;
  static override numericID = 267;
  static override nicknames = [
    "blockBlockfromproperties",
    "blockfromproperties",
    "blockWithProperties",
    "BlockWithProperties",
    "block_blockfromproperties",
    "block_with_properties",
  ];
  static override symbol = "block_with_props";
  static override interactName = "blockWithProperties";
  static override operatorName = "blockfromproperties" as const;
  static override displayName = "Block Properties" as const;
  static override fullDisplayName = "Block Block Properties" as const;
  static override tooltipInfo =
    "Get the given block applied with the given properties." as const;

  static override kind = "block" as const;
  static override renderPattern = "INFIX_VERYLONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Block",
            },
          },
        },
        normalizeSignature
      ),
      function: (block: Block): TypeLambda<CompoundTag, Block> => {
        return (nbtProperties: CompoundTag): Block => {
          const properties = new Properties(nbtProperties.toJSON());
          return new Block(properties, block);
        };
      },
    });
  }
}
