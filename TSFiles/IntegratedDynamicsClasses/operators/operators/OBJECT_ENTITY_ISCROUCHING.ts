import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISCROUCHING extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:entity_iscrouching" as const;
  static override nicknames = [
    "EntityIscrouching",
    "entity_is_crouching",
    "entityIsCrouching",
    "isCrouching",
  ];
  static override symbol = "is_crouching";
  static override interactName = "entityIsCrouching";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Boolean",
        },
      }),
      function: (entity: Entity): iBoolean => {
        return entity.isCrouching();
      },
    });
  }
}
