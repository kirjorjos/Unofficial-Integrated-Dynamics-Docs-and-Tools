import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_HURTSOUND extends BaseOperator<
  Entity,
  iString
> {
  static override internalName = "integrateddynamics:entity_hurtsound" as const;
  static override numericID = 21;
  static override nicknames = [
    "EntityHurtsound",
    "entity_hurt_sound",
    "entityHurtSound",
    "hurtsound",
    "entityHurtsound",
  ];
  static override symbol = "hurtsound";
  static override interactName = "entityHurtSound";
  static override operatorName = "hurtsound" as const;
  static override displayName = "Entity Hurt Sound" as const;
  static override fullDisplayName = "Entity Entity Hurt Sound" as const;
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
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iString => {
        return entity.getHurtSound();
      },
    });
  }
}
