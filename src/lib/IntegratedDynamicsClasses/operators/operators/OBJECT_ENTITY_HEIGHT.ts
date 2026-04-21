import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Double } from "lib/JavaNumberClasses/Double";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_HEIGHT extends BaseOperator<
  Entity,
  Double
> {
  static override internalName = "integrateddynamics:entity_height" as const;
  static override numericID = 20;
  static override nicknames = [
    "entityHeight",
    "EntityHeight",
    "height",
    "entity_height",
  ];
  static override symbol = "height";
  static override interactName = "entityHeight";
  static override operatorName = "height" as const;
  static override displayName = "Height" as const;
  static override fullDisplayName = "Entity Height" as const;
  static override tooltipInfo = "The entity height" as const;

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
        return entity.getHeight();
      },
    });
  }
}
