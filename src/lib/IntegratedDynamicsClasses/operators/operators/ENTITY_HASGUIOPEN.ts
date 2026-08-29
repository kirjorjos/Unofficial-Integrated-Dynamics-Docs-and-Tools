import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_ENTITY_HASGUIOPEN extends BaseOperator<Entity, iBoolean> {
  static override internalName =
    "integrateddynamics:entity_hasguiopen" as const;
  static override numericID = 186;
  static override nicknames = [
    "entityHasguiopen",
    "entityHasGuiOpen",
    "hasguiopen",
    "hasGuiOpen",
    "playerHasGuiOpen",
    "PlayerHasguiopen",
    "entity_has_gui_open",
    "entity_hasguiopen",
    "has_gui_open",
    "player_has_gui_open",
    "player_hasguiopen",
  ];
  static override symbol = "has_gui_open";
  static override interactName = "entityHasGuiOpen";
  static override operatorName = "hasguiopen" as const;
  static override displayName = "Has Gui Open" as const;
  static override fullDisplayName = "Entity Has Gui Open" as const;
  static override stringDisplayNames = [
    "has gui open",
    "has gui Open",
    "has Gui open",
    "has Gui Open",
    "Has gui open",
    "Has gui Open",
    "Has Gui open",
    "Has Gui Open",
    "entity has gui open",
    "entity has gui Open",
    "entity has Gui open",
    "entity has Gui Open",
    "entity Has gui open",
    "entity Has gui Open",
    "entity Has Gui open",
    "entity Has Gui Open",
    "Entity has gui open",
    "Entity has gui Open",
    "Entity has Gui open",
    "Entity has Gui Open",
    "Entity Has gui open",
    "Entity Has gui Open",
    "Entity Has Gui open",
    "Entity Has Gui Open",
  ];
  static override tooltipInfo =
    "If the given player has an external gui open." as const;

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
