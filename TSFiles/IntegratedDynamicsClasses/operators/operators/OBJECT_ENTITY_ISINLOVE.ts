import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISINLOVE extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_isinlove",
      nicknames: [
        "EntityIsinlove",
        "entity_is_in_love",
        "entityIsInLove",
        "isInLove",
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
      symbol: "is_in_love",
      interactName: "entityIsInLove",
      function: (entity: Entity): iBoolean => {
        return entity.isInLove();
      },
    });
  }
}
