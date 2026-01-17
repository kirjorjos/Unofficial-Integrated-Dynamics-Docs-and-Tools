import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_ENTITY_ENTITYITEMTOOLTIP extends BaseOperator<
  Entity,
  Operator<Item, iArray<iString>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_entityitemtooltip",
      nicknames: [
        "ItemstackEntityTooltip",
        "itemstack_entity_tooltip",
        "itemstackEntityTooltip",
        "item_entity_tooltip",
        "itemEntityTooltip",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Function",
            from: {
              type: "Item",
            },
            to: { type: "List", listType: { type: "String" } },
          },
        },
        globalMap
      ),
      symbol: "entity_item_tooltip",
      interactName: "entityEntityItemTooltip",
      function: (entity: Entity): TypeLambda<Item, iArray<iString>> => {
        return (item: Item): iArray<iString> => {
          if (entity.isPlayer().valueOf()) {
            return item.getTooltip(entity);
          }
          console.warn(
            "Entity item tooltip is not fully supported for non-player entities. Returning item tooltip only."
          );
          return item.getTooltip();
        };
      },
    });
  }
}
