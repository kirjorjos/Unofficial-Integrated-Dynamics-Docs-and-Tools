import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISEATING extends BaseOperator<
  Entity,
  iBoolean
> {
    static override internalName = "integrateddynamics:entity_iseating"
  constructor() {
    super({
      nicknames: [
        "EntityIseating",
        "entity_is_eating",
        "entityIsEating",
        "isEating",
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
      symbol: "is_eating",
      interactName: "entityIsEating",
      function: (entity: Entity): iBoolean => {
        return entity.isEating();
      },
    });
  }
}
