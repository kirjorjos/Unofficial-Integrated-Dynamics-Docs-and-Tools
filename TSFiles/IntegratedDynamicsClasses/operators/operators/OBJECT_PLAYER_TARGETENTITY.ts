import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_PLAYER_TARGETENTITY extends BaseOperator<
  Entity,
  Entity
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_targetentity",
      nicknames: [
        "EntityTargetentity",
        "entity_target_entity",
        "entityTargetEntity",
        "playerTargetEntity",
      ],
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
        globalMap
      ),
      symbol: "target_entity",
      interactName: "entityTargetEntity",
      function: (entity: Entity): Entity => {
        return entity.getTargetEntity();
      },
    });
  }
}
