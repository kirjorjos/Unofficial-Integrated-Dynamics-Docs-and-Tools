import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_ITEM extends BaseOperator<Entity, Item> {
  static override internalName = "integrateddynamics:entity_item" as const;
  constructor() {
    super({
      nicknames: [
        "EntityItemstack",
        "entity_itemstack",
        "entityItemstack",
        "entity_item_stack",
        "entityItemStack",
        "entity_item",
        "entityItem",
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
      symbol: "item",
      interactName: "entityItem",
      function: (entity: Entity): Item => {
        if (entity.isItem()) {
          return entity.getItem();
        } else {
          throw new Error("Entity is not an item entity.");
        }
      },
    });
  }
}
