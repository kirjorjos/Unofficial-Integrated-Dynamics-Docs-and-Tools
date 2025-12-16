import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_ITEM extends BaseOperator<Entity, Item> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_item",
      nicknames: [
        "EntityItemstack",
        "entity_itemstack",
        "entityItemstack",
        "entity_item_stack",
        "entityItemStack",
        "entity_item",
        "entityItem",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Item",
          },
        },
        globalMap
      ),
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
