import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISPLAYER extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_isplayer" as const;
  static override nicknames = [
    "EntityIsplayer",
    "entity_is_player",
    "entityIsPlayer",
    "isPlayer",
  ];
  static override symbol = "is_player";
  static override interactName = "entityIsPlayer";
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
