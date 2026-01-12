import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_AGE extends BaseOperator<Entity, Integer> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_age",
      nicknames: ["EntityAge", "entity_age", "entityAge"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "age",
      interactName: "entityAge",
      function: (entity: Entity): Integer => {
        return entity.getAge();
      },
    });
  }
}
