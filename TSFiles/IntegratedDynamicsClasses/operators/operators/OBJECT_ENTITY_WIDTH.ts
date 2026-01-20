import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Double } from "JavaNumberClasses/Double";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_WIDTH extends BaseOperator<Entity, Double> {
    static override internalName = "integrateddynamics:entity_width"
  constructor() {
    super({
      nicknames: ["EntityWidth", "entity_width", "entityWidth", "entityWidth"],
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
