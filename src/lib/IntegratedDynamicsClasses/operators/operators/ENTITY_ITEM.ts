import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

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
    "item",
  ];
  static override symbol = "item";
  static override interactName = "entityItem";
  static override operatorName = "item" as const;
  static override displayName = "Item" as const;
  static override fullDisplayName = "Entity Item" as const;
  static override kind = "entity" as const;
  static override renderPattern = "SUFFIX_1" as const;
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
