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
  ];
  static override symbol = "hurtsound";
  static override interactName = "entityHurtSound";
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
