import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_AGE extends BaseOperator<Entity, Integer> {
  static override internalName = "integrateddynamics:entity_age" as const;
  constructor() {
    super({
      nicknames: ["EntityAge", "entity_age", "entityAge"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "age",
      interactName: "entityAge",
      function: (entity: Entity): Integer => {
        return entity.getAge();
      },
    });
  }
}
