import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISITEM extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_isitem",
      nicknames: ["EntityIsitem", "entity_is_item", "entityIsItem", "isItem"],
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
      symbol: "is_item",
      interactName: "entityIsItem",
      function: (entity: Entity): iBoolean => {
        return entity.isItem();
      },
    });
  }
}
