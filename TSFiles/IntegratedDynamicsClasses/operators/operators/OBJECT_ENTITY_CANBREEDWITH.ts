import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Operator } from "../Operator";

export class OPERATOR_OBJECT_ENTITY_CANBREEDWITH extends BaseOperator<
  Entity,
  Operator<Item, iBoolean>
> {
  static override internalName =
    "integrateddynamics:entity_canbreedwith" as const;
  constructor() {
    super({
      nicknames: [
        "EntityCanbreedwith",
        "entity_can_breed_with",
        "entityCanBreedWith",
        "canBreedWith",
      ],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "can_breed_with",
      interactName: "entityCanBreedWith",
      function: (entity: Entity): TypeLambda<Item, iBoolean> => {
        return (item: Item): iBoolean => {
          return entity.getBreadableList().includes(item.getUniqueName());
        };
      },
    });
  }
}
