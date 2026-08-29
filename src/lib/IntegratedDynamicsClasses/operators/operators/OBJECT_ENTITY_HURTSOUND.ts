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
    "entityHurtsound",
    "entityHurtSound",
    "EntityHurtsound",
    "hurtsound",
    "entity_hurt_sound",
    "entity_hurtsound",
  ];
  static override symbol = "hurtsound";
  static override interactName = "entityHurtSound";
  static override operatorName = "hurtsound" as const;
  static override displayName = "Entity Hurt Sound" as const;
  static override fullDisplayName = "Entity Entity Hurt Sound" as const;
  static override stringDisplayNames = [
    "entity hurt sound",
    "entity hurt Sound",
    "entity Hurt sound",
    "entity Hurt Sound",
    "Entity hurt sound",
    "Entity hurt Sound",
    "Entity Hurt sound",
    "Entity Hurt Sound",
    "entity entity hurt sound",
    "entity entity hurt Sound",
    "entity entity Hurt sound",
    "entity entity Hurt Sound",
    "entity Entity hurt sound",
    "entity Entity hurt Sound",
    "entity Entity Hurt sound",
    "entity Entity Hurt Sound",
    "Entity entity hurt sound",
    "Entity entity hurt Sound",
    "Entity entity Hurt sound",
    "Entity entity Hurt Sound",
    "Entity Entity hurt sound",
    "Entity Entity hurt Sound",
    "Entity Entity Hurt sound",
    "Entity Entity Hurt Sound",
  ];
  static override tooltipInfo = "The hurt sound of the given entity." as const;

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
