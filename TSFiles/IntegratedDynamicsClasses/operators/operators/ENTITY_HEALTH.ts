import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_HEALTH extends BaseOperator<Entity, Double> {
  static override internalName = "integrateddynamics:entity_health" as const;
  constructor() {
    super({
      nicknames: [
        "EntityHealth",
        "entity_health",
        "entity_health_value",
        "entityHealthValue",
        "entityHealth",
        "health",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Double",
        },
      }),
      symbol: "health",
      interactName: "entityHealth",
      function: (entity: Entity): Double => {
        return entity.getHealth();
      },
    });
  }
}
