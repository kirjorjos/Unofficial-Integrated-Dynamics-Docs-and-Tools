import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISCROUCHING extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:entity_iscrouching" as const;
  static override numericID = 203;
  static override nicknames = [
    "entityIscrouching",
    "entityIsCrouching",
    "EntityIscrouching",
    "iscrouching",
    "isCrouching",
    "entity_is_crouching",
    "entity_iscrouching",
    "is_crouching",
  ];
  static override symbol = "is_crouching";
  static override interactName = "entityIsCrouching";
  static override operatorName = "iscrouching" as const;
  static override displayName = "Is Crouching" as const;
  static override fullDisplayName = "Entity Is Crouching" as const;
  static override tooltipInfo = "If the entity is crouching" as const;

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
        return entity.isCrouching();
      },
    });
  }
}
