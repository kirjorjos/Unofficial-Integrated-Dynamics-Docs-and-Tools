import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_ENTITY_ENTITYITEMTOOLTIP extends BaseOperator<
  Entity,
  Operator<Item, iArray<iString>>
> {
  static override internalName =
    "integrateddynamics:entity_entityitemtooltip" as const;
  static override numericID = 291;
  static override nicknames = [
    "entityEntityItemTooltip",
    "ItemstackEntityTooltip",
    "itemstack_entity_tooltip",
    "itemstackEntityTooltip",
    "item_entity_tooltip",
    "itemEntityTooltip",
    "entityitemtooltip",
    "entityEntityitemtooltip",
  ];
  static override symbol = "entity_item_tooltip";
  static override interactName = "entityEntityItemTooltip";
  static override operatorName = "entityitemtooltip" as const;
  static override displayName = "Entity Tooltip" as const;
  static override fullDisplayName = "Entity Entity Tooltip" as const;
  static override kind = "entity" as const;
  static override renderPattern = "INFIX_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
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
