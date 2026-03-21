import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISANIMAL extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_isanimal" as const;
  static override nicknames = [
    "EntityIsanimal",
    "entity_is_animal",
    "entityIsAnimal",
    "isAnimal",
  ];
  static override symbol = "is_animal";
  static override interactName = "entityIsAnimal";
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
        return entity.isAnimal();
      },
    });
  }
}
