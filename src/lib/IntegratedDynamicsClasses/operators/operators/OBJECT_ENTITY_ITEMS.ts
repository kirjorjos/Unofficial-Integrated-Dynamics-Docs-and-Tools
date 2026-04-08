import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_ENTITY_ITEMS extends BaseOperator<
  Entity,
  iArray<Item>
> {
  static override internalName =
    "integrateddynamics:entity_entityitems" as const;
  static override numericID = 176;
  static override nicknames = [
    "EntityItems",
    "entity_items",
    "entityItems",
    "entity_item_list",
    "entityItemList",
    "entityitems",
    "entityEntityitems",
  ];
  static override symbol = "entity_items";
  static override interactName = "entityItems";
  static override operatorName = "entityitems" as const;
  static override displayName = "Entity Items" as const;
  static override fullDisplayName = "Entity Entity Items" as const;
  static override tooltipInfo =
    "The items that are contained within this entity." as const;

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
        return new iArrayEager(entity.getItemList());
      },
    });
  }
}
