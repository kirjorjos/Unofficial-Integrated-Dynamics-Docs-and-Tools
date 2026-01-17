import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISMOB extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_ismob",
      nicknames: ["EntityIsmob", "entity_is_mob", "entityIsMob", "isMob"],
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
      symbol: "is_mob",
      interactName: "entityIsMob",
      function: (entity: Entity): iBoolean => {
        return entity.isMob();
      },
    });
  }
}
