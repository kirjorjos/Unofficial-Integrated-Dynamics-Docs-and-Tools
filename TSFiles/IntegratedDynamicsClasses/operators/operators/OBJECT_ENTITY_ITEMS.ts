import { TypeMap } from "HelperClasses/TypeMap";
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
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_entityitems",
      nicknames: [
        "EntityItems",
        "entity_items",
        "entityItems",
        "entity_item_list",
        "entityItemList",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "entity_items",
      interactName: "entityItems",
      function: (entity: Entity): iArray<Item> => {
        return new iArrayEager(entity.getItemList());
      },
    });
  }
}
