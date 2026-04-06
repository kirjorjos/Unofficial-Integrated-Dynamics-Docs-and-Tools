import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_ENTITY_HASGUIOPEN extends BaseOperator<Entity, iBoolean> {
  static override internalName =
    "integrateddynamics:entity_hasguiopen" as const;
  static override numericID = 186;
  static override nicknames = [
    "PlayerHasguiopen",
    "player_has_gui_open",
    "playerHasGuiOpen",
    "has_gui_open",
    "entityHasGuiOpen",
    "hasguiopen",
    "entityHasguiopen",
  ];
  static override symbol = "has_gui_open";
  static override interactName = "entityHasGuiOpen";
  static override operatorName = "hasguiopen" as const;
  static override displayName = "Has Gui Open" as const;
  static override fullDisplayName = "Entity Has Gui Open" as const;
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
        return entity.hasGuiOpen();
      },
    });
  }
}
