import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_ISMINECART extends BaseOperator<Entity, iBoolean> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_isminecart",
      nicknames: [
        "EntityIsminecart",
        "entity_is_minecart",
        "entityIsMinecart",
        "isMinecart",
        "is_minecart",
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
      symbol: "is_minecart",
      interactName: "entityIsMinecart",
      function: (entity: Entity): iBoolean => {
        return entity.isMinecart();
      },
    });
  }
}
