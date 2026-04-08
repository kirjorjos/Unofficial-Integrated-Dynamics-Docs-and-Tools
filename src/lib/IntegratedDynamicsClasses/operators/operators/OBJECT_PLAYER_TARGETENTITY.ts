import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

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
    "targetentity",
    "entityTargetentity",
  ];
  static override symbol = "target_entity";
  static override interactName = "entityTargetEntity";
  static override operatorName = "targetentity" as const;
  static override displayName = "Target Entity" as const;
  static override fullDisplayName = "Entity Target Entity" as const;
  static override tooltipInfo =
    "The entity the given entity is currently looking at." as const;

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
