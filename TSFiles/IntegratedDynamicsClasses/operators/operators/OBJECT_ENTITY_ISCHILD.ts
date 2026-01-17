import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISCHILD extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_ischild",
      nicknames: [
        "isChild",
        "EntityIschild",
        "entity_is_child",
        "entityIsChild",
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
      symbol: "is_child",
      interactName: "entityIsChild",
      function: (entity: Entity): iBoolean => {
        return entity.isChild();
      },
    });
  }
}
