import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_HELDITEM extends BaseOperator<Entity, Item> {
  static override internalName = "integrateddynamics:entity_helditem" as const;
  constructor() {
    super({
      nicknames: [
        "EntityHelditemMain",
        "entity_held_item_main",
        "entityHeldItemMain",
        "heldItemMain",
        "held_item_1",
        "entityHeldItem",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Item",
        },
      }),
      symbol: "held_item_1",
      interactName: "entityHeldItem",
      function: (entity: Entity): Item => {
        return entity.getHeldItemMain();
      },
    });
  }
}
