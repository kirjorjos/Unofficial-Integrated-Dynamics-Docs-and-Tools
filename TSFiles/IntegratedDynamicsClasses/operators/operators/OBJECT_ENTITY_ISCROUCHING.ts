import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISCROUCHING extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_iscrouching",
      nicknames: [
        "EntityIscrouching",
        "entity_is_crouching",
        "entityIsCrouching",
        "isCrouching",
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
      symbol: "is_crouching",
      interactName: "entityIsCrouching",
      function: (entity: Entity): iBoolean => {
        return entity.isCrouching();
      },
    });
  }
}
