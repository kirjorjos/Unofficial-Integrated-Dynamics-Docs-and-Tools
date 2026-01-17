import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Double } from "JavaNumberClasses/Double";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_HEIGHT extends BaseOperator<
  Entity,
  Double
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_height",
      nicknames: [
        "EntityHeight",
        "entity_height",
        "entityHeight",
        "entityHeight",
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
      symbol: "height",
      interactName: "entityHeight",
      function: (entity: Entity): Double => {
        return entity.getHeight();
      },
    });
  }
}
