import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISWET extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_iswet",
      nicknames: ["EntityIswet", "entity_is_wet", "entityIsWet", "isWet"],
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
      symbol: "is_wet",
      interactName: "entityIsWet",
      function: (entity: Entity): iBoolean => {
        return entity.isWet();
      },
    });
  }
}
