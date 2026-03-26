import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Properties } from "IntegratedDynamicsClasses/Properties";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_ENTITY_ITEM extends BaseOperator<Entity, Item> {
  static override internalName = "integrateddynamics:entity_item" as const;
  static override numericID = 30;
  static override nicknames = [
    "EntityItemstack",
    "entity_itemstack",
    "entityItemstack",
    "entity_item_stack",
    "entityItemStack",
    "entity_item",
    "entityItem",
  ];
  static override symbol = "item";
  static override interactName = "entityItem";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (entity: Entity): Item => {
        if (entity.isItem().valueOf()) {
          return entity.getItem() || new Item(new Properties({}));
        } else {
          return new Item(new Properties({}));
        }
      },
    });
  }
}
