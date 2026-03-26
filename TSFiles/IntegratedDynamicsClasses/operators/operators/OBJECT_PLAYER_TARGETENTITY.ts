import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_PLAYER_TARGETENTITY extends BaseOperator<
  Entity,
  Entity
> {
  static override internalName =
    "integrateddynamics:entity_targetentity" as const;
  static override numericID = 36;
  static override nicknames = [
    "EntityTargetentity",
    "entity_target_entity",
    "entityTargetEntity",
    "playerTargetEntity",
  ];
  static override symbol = "target_entity";
  static override interactName = "entityTargetEntity";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Entity",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): Entity => {
        return entity.getTargetEntity();
      },
    });
  }
}
