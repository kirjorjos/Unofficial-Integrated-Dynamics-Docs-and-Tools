import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_HEALTH extends BaseOperator<Entity, Double> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_health",
      nicknames: [
        "EntityHealth",
        "entity_health",
        "entity_health_value",
        "entityHealthValue",
        "entityHealth",
        "health",
      ],
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
        globalMap
      ),
      symbol: "health",
      interactName: "entityHealth",
      function: (entity: Entity): Double => {
        return entity.getHealth();
      },
    });
  }
}
