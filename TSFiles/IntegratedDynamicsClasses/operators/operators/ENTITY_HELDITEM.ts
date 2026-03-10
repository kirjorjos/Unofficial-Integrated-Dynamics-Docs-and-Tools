import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_HELDITEM extends BaseOperator<Entity, Item> {
  static override internalName = "integrateddynamics:entity_helditem" as const;
  static override nicknames = [
    "EntityHelditemMain",
    "entity_held_item_main",
    "entityHeldItemMain",
    "heldItemMain",
    "held_item_1",
    "entityHeldItem",
  ];
  static override symbol = "held_item_1";
  static override interactName = "entityHeldItem";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Item",
        },
      }),
      function: (entity: Entity): Item => {
        return entity.getHeldItemMain();
      },
    });
  }
}
