import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_ISMINECART extends BaseOperator<Entity, iBoolean> {
  static override internalName =
    "integrateddynamics:entity_isminecart" as const;
  constructor() {
    super({
      nicknames: [
        "EntityIsminecart",
        "entity_is_minecart",
        "entityIsMinecart",
        "isMinecart",
        "is_minecart",
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
      symbol: "is_minecart",
      interactName: "entityIsMinecart",
      function: (entity: Entity): iBoolean => {
        return entity.isMinecart();
      },
    });
  }
}
