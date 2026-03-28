import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_TYPE extends BaseOperator<Entity, iString> {
  static override internalName =
    "integrateddynamics:entity_entitytype" as const;
  static override numericID = 170;
  static override nicknames = ["EntityType", "entity_type", "entityType"];
  static override symbol = "entity_type";
  static override interactName = "entityType";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iString => {
        return entity.getEntityType();
      },
    });
  }
}
