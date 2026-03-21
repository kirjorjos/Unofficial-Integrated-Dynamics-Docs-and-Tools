import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Item } from "IntegratedDynamicsClasses/Item";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_ENTITY_ITEMS extends BaseOperator<
  Entity,
  iArray<Item>
> {
  static override internalName =
    "integrateddynamics:entity_entityitems" as const;
  static override nicknames = [
    "EntityItems",
    "entity_items",
    "entityItems",
    "entity_item_list",
    "entityItemList",
  ];
  static override symbol = "entity_items";
  static override interactName = "entityItems";
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
        return new iArrayEager(entity.getItemList());
      },
    });
  }
}
