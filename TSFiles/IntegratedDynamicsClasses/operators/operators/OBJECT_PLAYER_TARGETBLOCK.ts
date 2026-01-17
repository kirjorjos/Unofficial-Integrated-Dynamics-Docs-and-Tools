import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_PLAYER_TARGETBLOCK extends BaseOperator<
  Entity,
  Block
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_targetblock",
      nicknames: [
        "PlayerTargetblock",
        "player_target_block",
        "playerTargetBlock",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Block",
          },
        },
        globalMap
      ),
      symbol: "target_block",
      interactName: "entityTargetBlock",
      function: (entity: Entity): Block => {
        return entity.getTargetBlock();
      },
    });
  }
}
