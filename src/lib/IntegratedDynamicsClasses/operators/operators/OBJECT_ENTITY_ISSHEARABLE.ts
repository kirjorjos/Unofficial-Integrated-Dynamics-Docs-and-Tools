import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISSHEARABLE extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:entity_isshearable" as const;
  static override numericID = 132;
  static override nicknames = [
    "entityIsshearable",
    "entityIsShearable",
    "EntityIsshearable",
    "entity_is_shearable",
    "entity_isshearable",
  ];
  static override symbol = "is_shearable";
  static override interactName = "entityIsShearable";
  static override operatorName = "isshearable" as const;
  static override displayName = "Entity Is Shearable" as const;
  static override fullDisplayName = "Entity Entity Is Shearable" as const;
  static override stringDisplayNames = [
    "entity is shearable",
    "entity is Shearable",
    "entity Is shearable",
    "entity Is Shearable",
    "Entity is shearable",
    "Entity is Shearable",
    "Entity Is shearable",
    "Entity Is Shearable",
    "entity entity is shearable",
    "entity entity is Shearable",
    "entity entity Is shearable",
    "entity entity Is Shearable",
    "entity Entity is shearable",
    "entity Entity is Shearable",
    "entity Entity Is shearable",
    "entity Entity Is Shearable",
    "Entity entity is shearable",
    "Entity entity is Shearable",
    "Entity entity Is shearable",
    "Entity entity Is Shearable",
    "Entity Entity is shearable",
    "Entity Entity is Shearable",
    "Entity Entity Is shearable",
    "Entity Entity Is Shearable",
  ];
  static override tooltipInfo = "If the given entity is shearable" as const;

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
        return entity.isShearable();
      },
    });
  }
}
