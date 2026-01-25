import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_CANBREED extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_canbreed" as const;
  constructor() {
    super({
      nicknames: [
        "EntityCanbreed",
        "entity_can_breed",
        "entityCanBreed",
        "canBreed",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Boolean",
        },
      }),
      symbol: "canbreed",
      interactName: "entityCanBreed",
      function: (entity: Entity): iBoolean => {
        return entity.canBreed();
      },
    });
  }
}
