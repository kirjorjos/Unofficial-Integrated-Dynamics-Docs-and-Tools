import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Double } from "JavaNumberClasses/Double";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_HEIGHT extends BaseOperator<
  Entity,
  Double
> {
  static override internalName = "integrateddynamics:entity_height" as const;
  constructor() {
    super({
      nicknames: [
        "EntityHeight",
        "entity_height",
        "entityHeight",
        "entityHeight",
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
      symbol: "height",
      interactName: "entityHeight",
      function: (entity: Entity): Double => {
        return entity.getHeight();
      },
    });
  }
}
