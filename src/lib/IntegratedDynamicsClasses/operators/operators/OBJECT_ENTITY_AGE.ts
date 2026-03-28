import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_AGE extends BaseOperator<Entity, Integer> {
  static override internalName = "integrateddynamics:entity_age" as const;
  static override numericID = 126;
  static override nicknames = ["EntityAge", "entity_age", "entityAge"];
  static override symbol = "age";
  static override interactName = "entityAge";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): Integer => {
        return entity.getAge();
      },
    });
  }
}
