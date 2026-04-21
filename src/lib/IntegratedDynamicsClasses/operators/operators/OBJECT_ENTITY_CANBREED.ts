import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_CANBREED extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_canbreed" as const;
  static override numericID = 127;
  static override nicknames = [
    "canbreed",
    "canBreed",
    "entityCanbreed",
    "entityCanBreed",
    "EntityCanbreed",
    "can_breed",
    "entity_can_breed",
    "entity_canbreed",
  ];
  static override symbol = "canbreed";
  static override interactName = "entityCanBreed";
  static override operatorName = "canbreed" as const;
  static override displayName = "Entity Can Breed" as const;
  static override fullDisplayName = "Entity Entity Can Breed" as const;
  static override tooltipInfo =
    "If the given entity is ready to be bred." as const;

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
        return entity.canBreed();
      },
    });
  }
}
