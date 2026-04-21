import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_ENTITY_ISMINECART extends BaseOperator<Entity, iBoolean> {
  static override internalName =
    "integrateddynamics:entity_isminecart" as const;
  static override numericID = 171;
  static override nicknames = [
    "entityIsminecart",
    "entityIsMinecart",
    "EntityIsminecart",
    "isminecart",
    "isMinecart",
    "entity_is_minecart",
    "entity_isminecart",
    "is_minecart",
  ];
  static override symbol = "is_minecart";
  static override interactName = "entityIsMinecart";
  static override operatorName = "isminecart" as const;
  static override displayName = "Is Minecart" as const;
  static override fullDisplayName = "Entity Is Minecart" as const;
  static override tooltipInfo = "If the entity is a minecart" as const;

  static override kind = "entity" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
