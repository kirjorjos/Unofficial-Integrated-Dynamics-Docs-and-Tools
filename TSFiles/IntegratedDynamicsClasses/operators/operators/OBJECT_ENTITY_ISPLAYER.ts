import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISPLAYER extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_isplayer",
      nicknames: [
        "EntityIsplayer",
        "entity_is_player",
        "entityIsPlayer",
        "isPlayer",
      ],
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
        globalMap
      ),
      symbol: "is_player",
      interactName: "entityIsPlayer",
      function: (entity: Entity): iBoolean => {
        return entity.isPlayer();
      },
    });
  }
}
