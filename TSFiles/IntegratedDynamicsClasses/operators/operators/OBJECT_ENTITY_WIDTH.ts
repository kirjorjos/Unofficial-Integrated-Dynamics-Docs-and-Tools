import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Double } from "JavaNumberClasses/Double";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_WIDTH extends BaseOperator<Entity, Double> {
  static override internalName =
    "integrateddynamics:object_entity_width" as const;
  static override nicknames = ["EntityWidth", "entity_width", "entityWidth"];
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
