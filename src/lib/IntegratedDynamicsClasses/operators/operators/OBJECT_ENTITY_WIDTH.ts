import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Double } from "lib/JavaNumberClasses/Double";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_WIDTH extends BaseOperator<Entity, Double> {
  static override internalName =
    "integrateddynamics:object_entity_width" as const;
  static override numericID = 71;
  static override nicknames = [
    "EntityWidth",
    "entity_width",
    "entityWidth",
    "width",
  ];
  static override symbol = "width";
  static override interactName = "entityWidth";
  static override operatorName = "width" as const;
  static override displayName = "Width" as const;
  static override fullDisplayName = "Entity Width" as const;
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
        return entity.getWidth();
      },
    });
  }
}
