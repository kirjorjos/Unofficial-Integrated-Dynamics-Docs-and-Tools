import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISCHILD extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_ischild" as const;
  constructor() {
    super({
      nicknames: [
        "isChild",
        "EntityIschild",
        "entity_is_child",
        "entityIsChild",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Boolean",
        },
      }),
      symbol: "is_child",
      interactName: "entityIsChild",
      function: (entity: Entity): iBoolean => {
        return entity.isChild();
      },
    });
  }
}
