import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_PLAYER_TARGETBLOCK extends BaseOperator<
  Entity,
  Block
> {
  static override internalName =
    "integrateddynamics:entity_targetblock" as const;
  static override numericID = 35;
  static override nicknames = [
    "entityTargetBlock",
    "PlayerTargetblock",
    "player_target_block",
    "playerTargetBlock",
    "targetblock",
    "entityTargetblock",
  ];
  static override symbol = "target_block";
  static override interactName = "entityTargetBlock";
  static override operatorName = "targetblock" as const;
  static override displayName = "Target Block" as const;
  static override fullDisplayName = "Entity Target Block" as const;
  static override kind = "entity" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (entity: Entity): Block => {
        return entity.getTargetBlock();
      },
    });
  }
}
