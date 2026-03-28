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
  static override nicknames = ["EntityHeight", "entity_height", "entityHeight"];
  static override symbol = "height";
  static override interactName = "entityHeight";
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
