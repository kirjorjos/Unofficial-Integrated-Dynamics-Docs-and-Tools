import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_WIDTH extends BaseOperator<Entity, Double> {
    static override internalName = "integrateddynamics:entity_width"
  constructor() {
    super({
      nicknames: ["EntityWidth", "entity_width", "entityWidth", "width"],
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
      symbol: "width",
      interactName: "entityWidth",
      function: (entity: Entity): Double => {
        return entity.getWidth();
      },
    });
  }
}
