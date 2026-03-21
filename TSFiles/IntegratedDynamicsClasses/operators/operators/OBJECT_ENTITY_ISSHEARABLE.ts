import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISSHEARABLE extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:entity_isshearable" as const;
  static override nicknames = [
    "EntityIsshearable",
    "entity_is_shearable",
    "entityIsShearable",
  ];
  static override symbol = "is_shearable";
  static override interactName = "entityIsShearable";
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
