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
    "EntityCanbreedwith",
    "entity_can_breed_with",
    "entityCanBreedWith",
    "canBreedWith",
  ];
  static override symbol = "can_breed_with";
  static override interactName = "entityCanBreedWith";
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
