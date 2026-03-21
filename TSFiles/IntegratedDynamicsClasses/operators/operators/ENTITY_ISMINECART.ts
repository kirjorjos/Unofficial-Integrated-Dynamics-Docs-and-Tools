import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_ISMINECART extends BaseOperator<Entity, iBoolean> {
  static override internalName =
    "integrateddynamics:entity_isminecart" as const;
  static override nicknames = [
    "EntityIsminecart",
    "entity_is_minecart",
    "entityIsMinecart",
    "isMinecart",
    "is_minecart",
  ];
  static override symbol = "is_minecart";
  static override interactName = "entityIsMinecart";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (entity: Entity): iBoolean => {
        return entity.isMinecart();
      },
    });
  }
}
