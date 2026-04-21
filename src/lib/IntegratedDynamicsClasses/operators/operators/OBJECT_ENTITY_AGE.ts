import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_AGE extends BaseOperator<Entity, Integer> {
  static override internalName = "integrateddynamics:entity_age" as const;
  static override numericID = 126;
  static override nicknames = ["age", "entityAge", "EntityAge", "entity_age"];
  static override symbol = "age";
  static override interactName = "entityAge";
  static override operatorName = "age" as const;
  static override displayName = "Entity Age" as const;
  static override fullDisplayName = "Entity Entity Age" as const;
  static override tooltipInfo = "The age of the given entity." as const;

  static override kind = "entity" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
