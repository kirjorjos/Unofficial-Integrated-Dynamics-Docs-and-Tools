import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_TYPE extends BaseOperator<Entity, iString> {
    static override internalName = "integrateddynamics:entity_entitytype"
  constructor() {
    super({
      nicknames: ["EntityType", "entity_type", "entityType"],
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
        globalMap
      ),
      symbol: "entity_type",
      interactName: "entityType",
      function: (entity: Entity): iString => {
        return entity.getEntityType();
      },
    });
  }
}
