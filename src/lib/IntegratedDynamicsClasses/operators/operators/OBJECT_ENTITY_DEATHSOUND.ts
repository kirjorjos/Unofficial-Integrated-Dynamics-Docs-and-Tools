import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_DEATHSOUND extends BaseOperator<
  Entity,
  iString
> {
  static override internalName =
    "integrateddynamics:entity_deathsound" as const;
  static override numericID = 19;
  static override nicknames = [
    "deathsound",
    "entityDeathsound",
    "entityDeathSound",
    "EntityDeathsound",
    "entity_death_sound",
    "entity_deathsound",
  ];
  static override symbol = "deathsound";
  static override interactName = "entityDeathSound";
  static override operatorName = "deathsound" as const;
  static override displayName = "Entity Death Sound" as const;
  static override fullDisplayName = "Entity Entity Death Sound" as const;
  static override stringDisplayNames = [
    "entity death sound",
    "entity death Sound",
    "entity Death sound",
    "entity Death Sound",
    "Entity death sound",
    "Entity death Sound",
    "Entity Death sound",
    "Entity Death Sound",
    "entity entity death sound",
    "entity entity death Sound",
    "entity entity Death sound",
    "entity entity Death Sound",
    "entity Entity death sound",
    "entity Entity death Sound",
    "entity Entity Death sound",
    "entity Entity Death Sound",
    "Entity entity death sound",
    "Entity entity death Sound",
    "Entity entity Death sound",
    "Entity entity Death Sound",
    "Entity Entity death sound",
    "Entity Entity death Sound",
    "Entity Entity Death sound",
    "Entity Entity Death Sound",
  ];
  static override tooltipInfo = "The death sound of the given entity." as const;

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
        return entity.getDeathSound();
      },
    });
  }
}
