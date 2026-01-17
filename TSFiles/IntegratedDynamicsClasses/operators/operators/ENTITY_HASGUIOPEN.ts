import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_ENTITY_HASGUIOPEN extends BaseOperator<Entity, iBoolean> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_hasguiopen",
      nicknames: [
        "PlayerHasguiopen",
        "player_has_gui_open",
        "playerHasGuiOpen",
        "has_gui_open",
        "entityHasGuiOpen",
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
      symbol: "has_gui_open",
      interactName: "entityHasGuiOpen",
      function: (entity: Entity): iBoolean => {
        return entity.hasGuiOpen();
      },
    });
  }
}
