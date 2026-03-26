import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Item } from "IntegratedDynamicsClasses/Item";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OBJECT_ENTITY_INVENTORY extends BaseOperator<
  Entity,
  iArray<Item>
> {
  static override internalName = "integrateddynamics:entity_inventory" as const;
  static override numericID = 22;
  static override nicknames = [
    "entityInventory",
    "EntityInventoryContents",
    "entity_inventory_contents",
    "entityInventoryContents",
  ];
  static override symbol = "entity_inventory";
  static override interactName = "entityInventory";
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
