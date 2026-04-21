import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISEATING extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_iseating" as const;
  static override numericID = 25;
  static override nicknames = [
    "entityIseating",
    "entityIsEating",
    "EntityIseating",
    "iseating",
    "isEating",
    "entity_is_eating",
    "entity_iseating",
    "is_eating",
  ];
  static override symbol = "is_eating";
  static override interactName = "entityIsEating";
  static override operatorName = "iseating" as const;
  static override displayName = "Is Eating" as const;
  static override fullDisplayName = "Entity Is Eating" as const;
  static override tooltipInfo = "If the entity is eating" as const;

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
        return entity.isEating();
      },
    });
  }
}
