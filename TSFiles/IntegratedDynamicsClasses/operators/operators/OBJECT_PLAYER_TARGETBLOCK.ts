import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_PLAYER_TARGETBLOCK extends BaseOperator<
  Entity,
  Block
> {
  static override internalName =
    "integrateddynamics:entity_targetblock" as const;
  static override nicknames = [
    "PlayerTargetblock",
    "player_target_block",
    "playerTargetBlock",
  ];
  static override symbol = "target_block";
  static override interactName = "entityTargetBlock";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Block",
        },
      }),
      function: (entity: Entity): Block => {
        return entity.getTargetBlock();
      },
    });
  }
}
