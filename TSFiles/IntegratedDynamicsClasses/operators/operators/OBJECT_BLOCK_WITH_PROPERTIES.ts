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
  constructor() {
    super({
      nicknames: [
        "BlockWithProperties",
        "block_with_properties",
        "blockWithProperties",
      ],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "block_with_props",
      interactName: "blockWithProperties",
      function: (block: Block): TypeLambda<CompoundTag, Block> => {
        return (nbtProperties: CompoundTag): Block => {
          const properties = new Properties(nbtProperties.toJSON());
          return new Block(properties, block);
        };
      },
    });
  }
}
