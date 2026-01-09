import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_POSSIBLE_PROPERTIES extends BaseOperator<
  Block,
  Tag<any>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:block_blockpossibleproperties",
      nicknames: [
        "BlockPossibleProperties",
        "block_possible_properties",
        "blockPossibleProperties",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "block_all_props",
      interactName: "blockPossibleProperties",
      function: (_block: Block): never => {
        throw new Error(
          "Block possible properties is infeasible without a registry. This is a placeholder function."
        );
      },
    });
  }
}
