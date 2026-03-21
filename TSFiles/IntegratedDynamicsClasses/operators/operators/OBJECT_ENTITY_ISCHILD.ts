import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISCHILD extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_ischild" as const;
  static override nicknames = [
    "isChild",
    "EntityIschild",
    "entity_is_child",
    "entityIsChild",
  ];
  static override symbol = "is_child";
  static override interactName = "entityIsChild";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (entity: Entity): iBoolean => {
        return entity.isChild();
      },
    });
  }
}
