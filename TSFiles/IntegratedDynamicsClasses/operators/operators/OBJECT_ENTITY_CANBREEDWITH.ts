import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Operator } from "../Operator";

export class OPERATOR_OBJECT_ENTITY_CANBREEDWITH extends BaseOperator<
  Entity,
  Operator<Entity, iBoolean>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_canbreedwith",
      nicknames: [
        "EntityCanbreedwith",
        "entity_can_breed_with",
        "entityCanBreedWith",
        "canBreedWith",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "can_breed_with",
      interactName: "entityCanBreedWith",
      function: (entity1: Entity): TypeLambda<Entity, iBoolean> => {
        return (entity2: Entity): iBoolean => {
          return entity1.getBreadableList().includes(entity2.getUniqueName());
        };
      },
    });
  }
}
