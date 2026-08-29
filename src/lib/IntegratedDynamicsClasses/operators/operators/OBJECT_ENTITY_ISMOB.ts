import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISMOB extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_ismob" as const;
  static override numericID = 27;
  static override nicknames = [
    "entityIsmob",
    "entityIsMob",
    "EntityIsmob",
    "ismob",
    "isMob",
    "entity_is_mob",
    "entity_ismob",
    "is_mob",
  ];
  static override symbol = "is_mob";
  static override interactName = "entityIsMob";
  static override operatorName = "ismob" as const;
  static override displayName = "Is Mob" as const;
  static override fullDisplayName = "Entity Is Mob" as const;
  static override stringDisplayNames = [
    "is mob",
    "is Mob",
    "Is mob",
    "Is Mob",
    "entity is mob",
    "entity is Mob",
    "entity Is mob",
    "entity Is Mob",
    "Entity is mob",
    "Entity is Mob",
    "Entity Is mob",
    "Entity Is Mob",
  ];
  static override tooltipInfo = "If the entity is a mob" as const;

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
        return entity.isMob();
      },
    });
  }
}
