import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_TYPE extends BaseOperator<Entity, iString> {
  static override internalName =
    "integrateddynamics:entity_entitytype" as const;
  static override nicknames = ["EntityType", "entity_type", "entityType"];
  static override symbol = "entity_type";
  static override interactName = "entityType";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "String",
        },
      }),
      function: (entity: Entity): iString => {
        return entity.getEntityType();
      },
    });
  }
}
