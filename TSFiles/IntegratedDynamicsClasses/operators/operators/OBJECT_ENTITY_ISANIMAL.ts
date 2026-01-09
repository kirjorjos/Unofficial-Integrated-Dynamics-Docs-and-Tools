import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISANIMAL extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_isanimal",
      nicknames: [
        "EntityIsanimal",
        "entity_is_animal",
        "entityIsAnimal",
        "isAnimal",
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
      symbol: "is_animal",
      interactName: "entityIsAnimal",
      function: (entity: Entity): iBoolean => {
        return entity.isAnimal();
      },
    });
  }
}
