import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OBJECT_ENTITY_INVENTORY extends BaseOperator<
  Entity,
  iArray<Item>
> {
  static override internalName = "integrateddynamics:entity_inventory" as const;
  static override numericID = 22;
  static override nicknames = [
    "entityInventory",
    "entityInventoryContents",
    "EntityInventoryContents",
    "entity_inventory",
    "entity_inventory_contents",
  ];
  static override symbol = "entity_inventory";
  static override interactName = "entityInventory";
  static override operatorName = "inventory" as const;
  static override displayName = "Player Inventory" as const;
  static override fullDisplayName = "Entity Player Inventory" as const;
  static override tooltipInfo =
    "The list of items the player is carrying." as const;

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
          to: { type: "List", listType: { type: "Item" } },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iArray<Item> => {
        return entity.getInventory();
      },
    });
  }
}
