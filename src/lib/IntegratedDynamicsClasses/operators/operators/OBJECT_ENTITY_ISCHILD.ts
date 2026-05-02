import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISCHILD extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_ischild" as const;
  static override numericID = 129;
  static override nicknames = [
    "entityIschild",
    "entityIsChild",
    "EntityIschild",
    "ischild",
    "isChild",
    "entity_is_child",
    "entity_ischild",
    "is_child",
  ];
  static override symbol = "is_child";
  static override interactName = "entityIsChild";
  static override operatorName = "ischild" as const;
  static override displayName = "Entity Is Child" as const;
  static override fullDisplayName = "Entity Entity Is Child" as const;
  static override tooltipInfo = "If the given entity is a child." as const;

  static override kind = "entity" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
