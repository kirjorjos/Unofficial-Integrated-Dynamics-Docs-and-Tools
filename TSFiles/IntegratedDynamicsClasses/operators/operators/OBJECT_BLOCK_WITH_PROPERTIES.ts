import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Operator } from "../Operator";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "IntegratedDynamicsClasses/Properties";

export class OPERATOR_OBJECT_BLOCK_WITH_PROPERTIES extends BaseOperator<
  Block,
  Operator<CompoundTag, Block>
> {
  static override internalName =
    "integrateddynamics:block_blockfromproperties" as const;
  static override nicknames = [
    "BlockWithProperties",
    "block_with_properties",
    "blockWithProperties",
  ];
  static override symbol = "block_with_props";
  static override interactName = "blockWithProperties";
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
