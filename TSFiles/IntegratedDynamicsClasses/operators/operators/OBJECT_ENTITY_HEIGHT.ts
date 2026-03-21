import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Double } from "JavaNumberClasses/Double";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_HEIGHT extends BaseOperator<
  Entity,
  Double
> {
  static override internalName = "integrateddynamics:entity_height" as const;
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
