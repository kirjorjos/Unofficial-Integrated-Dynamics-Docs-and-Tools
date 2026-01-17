import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_CANBREED extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_canbreed",
      nicknames: [
        "EntityCanbreed",
        "entity_can_breed",
        "entityCanBreed",
        "canBreed",
      ],
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
        globalMap
      ),
      symbol: "canbreed",
      interactName: "entityCanBreed",
      function: (entity: Entity): iBoolean => {
        return entity.canBreed();
      },
    });
  }
}
