import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_ENTITY_HEALTH extends BaseOperator<Entity, Double> {
  static override internalName = "integrateddynamics:entity_health" as const;
  static override numericID = 91;
  static override nicknames = [
    "entityHealth",
    "EntityHealth",
    "entityHealthValue",
    "health",
    "entity_health",
    "entity_health_value",
  ];
  static override symbol = "health";
  static override interactName = "entityHealth";
  static override operatorName = "health" as const;
  static override displayName = "Health" as const;
  static override fullDisplayName = "Entity Health" as const;
  static override tooltipInfo = "The entity health" as const;

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
            type: "Double",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): Double => {
        return entity.getHealth();
      },
    });
  }
}
