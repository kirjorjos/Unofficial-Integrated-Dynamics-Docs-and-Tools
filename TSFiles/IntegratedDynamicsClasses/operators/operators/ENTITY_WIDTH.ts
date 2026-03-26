import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_WIDTH extends BaseOperator<Entity, Double> {
  static override internalName = "integrateddynamics:entity_width" as const;
  static override numericID = 92;
  static override nicknames = [
    "EntityWidth",
    "entity_width",
    "entityWidth",
    "width",
  ];
  static override symbol = "width";
  static override interactName = "entityWidth";
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
