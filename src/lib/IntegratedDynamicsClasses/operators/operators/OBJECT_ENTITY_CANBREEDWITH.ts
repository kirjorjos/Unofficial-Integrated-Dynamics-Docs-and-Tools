import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_OBJECT_ENTITY_CANBREEDWITH extends BaseOperator<
  Entity,
  Operator<Item, iBoolean>
> {
  static override internalName =
    "integrateddynamics:entity_canbreedwith" as const;
  static override numericID = 128;
  static override nicknames = [
    "canbreedwith",
    "canBreedWith",
    "entityCanbreedwith",
    "entityCanBreedWith",
    "EntityCanbreedwith",
    "can_breed_with",
    "entity_can_breed_with",
    "entity_canbreedwith",
  ];
  static override symbol = "can_breed_with";
  static override interactName = "entityCanBreedWith";
  static override operatorName = "canbreedwith" as const;
  static override displayName = "Entity Can Breed With" as const;
  static override fullDisplayName = "Entity Entity Can Breed With" as const;
  static override stringDisplayNames = [
    "entity can breed with",
    "entity can breed With",
    "entity can Breed with",
    "entity can Breed With",
    "entity Can breed with",
    "entity Can breed With",
    "entity Can Breed with",
    "entity Can Breed With",
    "Entity can breed with",
    "Entity can breed With",
    "Entity can Breed with",
    "Entity can Breed With",
    "Entity Can breed with",
    "Entity Can breed With",
    "Entity Can Breed with",
    "Entity Can Breed With",
    "entity entity can breed with",
    "entity entity can breed With",
    "entity entity can Breed with",
    "entity entity can Breed With",
    "entity entity Can breed with",
    "entity entity Can breed With",
    "entity entity Can Breed with",
    "entity entity Can Breed With",
    "entity Entity can breed with",
    "entity Entity can breed With",
    "entity Entity can Breed with",
    "entity Entity can Breed With",
    "entity Entity Can breed with",
    "entity Entity Can breed With",
    "entity Entity Can Breed with",
    "entity Entity Can Breed With",
    "Entity entity can breed with",
    "Entity entity can breed With",
    "Entity entity can Breed with",
    "Entity entity can Breed With",
    "Entity entity Can breed with",
    "Entity entity Can breed With",
    "Entity entity Can Breed with",
    "Entity entity Can Breed With",
    "Entity Entity can breed with",
    "Entity Entity can breed With",
    "Entity Entity can Breed with",
    "Entity Entity can Breed With",
    "Entity Entity Can breed with",
    "Entity Entity Can breed With",
    "Entity Entity Can Breed with",
    "Entity Entity Can Breed With",
  ];
  static override tooltipInfo =
    "If the given entity can be breed using the given item." as const;

  static override kind = "entity" as const;
  static override renderPattern = "INFIX_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): TypeLambda<Item, iBoolean> => {
        return (item: Item): iBoolean => {
          return entity.getBreadableList().includes(item.getUniqueName());
        };
      },
    });
  }
}
