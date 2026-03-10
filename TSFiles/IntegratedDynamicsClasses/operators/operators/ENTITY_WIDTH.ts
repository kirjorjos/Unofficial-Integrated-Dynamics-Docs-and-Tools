import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_WIDTH extends BaseOperator<Entity, Double> {
  static override internalName = "integrateddynamics:entity_width" as const;
  static override nicknames = [
    "EntityWidth",
    "entity_width",
    "entityWidth",
    "width",
  ];
  static override symbol = "width";
  static override interactName = "entityWidth";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Double",
        },
      }),
      function: (entity: Entity): Double => {
        return entity.getWidth();
      },
    });
  }
}
