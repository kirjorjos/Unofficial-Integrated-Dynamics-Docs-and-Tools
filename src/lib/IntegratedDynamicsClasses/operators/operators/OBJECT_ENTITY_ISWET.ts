import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISWET extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_iswet" as const;
  static override numericID = 29;
  static override nicknames = [
    "EntityIswet",
    "entity_is_wet",
    "entityIsWet",
    "isWet",
    "iswet",
    "entityIswet",
  ];
  static override symbol = "is_wet";
  static override interactName = "entityIsWet";
  static override operatorName = "iswet" as const;
  static override displayName = "Is Wet" as const;
  static override fullDisplayName = "Entity Is Wet" as const;
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
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iBoolean => {
        return entity.isWet();
      },
    });
  }
}
