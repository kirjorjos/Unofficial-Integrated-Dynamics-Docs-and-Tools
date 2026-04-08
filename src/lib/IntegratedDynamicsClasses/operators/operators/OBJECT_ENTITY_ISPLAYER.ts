import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISPLAYER extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_isplayer" as const;
  static override numericID = 28;
  static override nicknames = [
    "EntityIsplayer",
    "entity_is_player",
    "entityIsPlayer",
    "isPlayer",
    "isplayer",
    "entityIsplayer",
  ];
  static override symbol = "is_player";
  static override interactName = "entityIsPlayer";
  static override operatorName = "isplayer" as const;
  static override displayName = "Is Player" as const;
  static override fullDisplayName = "Entity Is Player" as const;
  static override tooltipInfo = "If the entity is a player" as const;

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
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iBoolean => {
        return entity.isPlayer();
      },
    });
  }
}
