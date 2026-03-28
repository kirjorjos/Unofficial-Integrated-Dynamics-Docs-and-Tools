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
  ];
  static override symbol = "has_gui_open";
  static override interactName = "entityHasGuiOpen";
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
