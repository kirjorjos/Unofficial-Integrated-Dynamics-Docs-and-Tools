import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISBURNING extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_isburning" as const;
  static override numericID = 24;
  static override nicknames = [
    "EntityIsburning",
    "entity_is_burning",
    "entityIsBurning",
    "isBurning",
    "isburning",
    "entityIsburning",
  ];
  static override symbol = "is_burning";
  static override interactName = "entityIsBurning";
  static override operatorName = "isburning" as const;
  static override displayName = "Is Burning" as const;
  static override fullDisplayName = "Entity Is Burning" as const;
  static override tooltipInfo = "If the entity is burning" as const;

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
        return entity.isBurning();
      },
    });
  }
}
