import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISINLOVE extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_isinlove" as const;
  static override numericID = 130;
  static override nicknames = [
    "entityIsinlove",
    "entityIsInLove",
    "EntityIsinlove",
    "isinlove",
    "isInLove",
    "entity_is_in_love",
    "entity_isinlove",
    "is_in_love",
  ];
  static override symbol = "is_in_love";
  static override interactName = "entityIsInLove";
  static override operatorName = "isinlove" as const;
  static override displayName = "Entity Is In Love" as const;
  static override fullDisplayName = "Entity Entity Is In Love" as const;
  static override stringDisplayNames = [
    "entity is in love",
    "entity is in Love",
    "entity is In love",
    "entity is In Love",
    "entity Is in love",
    "entity Is in Love",
    "entity Is In love",
    "entity Is In Love",
    "Entity is in love",
    "Entity is in Love",
    "Entity is In love",
    "Entity is In Love",
    "Entity Is in love",
    "Entity Is in Love",
    "Entity Is In love",
    "Entity Is In Love",
    "entity entity is in love",
    "entity entity is in Love",
    "entity entity is In love",
    "entity entity is In Love",
    "entity entity Is in love",
    "entity entity Is in Love",
    "entity entity Is In love",
    "entity entity Is In Love",
    "entity Entity is in love",
    "entity Entity is in Love",
    "entity Entity is In love",
    "entity Entity is In Love",
    "entity Entity Is in love",
    "entity Entity Is in Love",
    "entity Entity Is In love",
    "entity Entity Is In Love",
    "Entity entity is in love",
    "Entity entity is in Love",
    "Entity entity is In love",
    "Entity entity is In Love",
    "Entity entity Is in love",
    "Entity entity Is in Love",
    "Entity entity Is In love",
    "Entity entity Is In Love",
    "Entity Entity is in love",
    "Entity Entity is in Love",
    "Entity Entity is In love",
    "Entity Entity is In Love",
    "Entity Entity Is in love",
    "Entity Entity Is in Love",
    "Entity Entity Is In love",
    "Entity Entity Is In Love",
  ];
  static override tooltipInfo =
    "If the given entity is in love and is ready to breed." as const;

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
        return entity.isInLove();
      },
    });
  }
}
