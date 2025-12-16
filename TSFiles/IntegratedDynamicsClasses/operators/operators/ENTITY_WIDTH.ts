import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_WIDTH extends BaseOperator<Entity, Double> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_width",
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
