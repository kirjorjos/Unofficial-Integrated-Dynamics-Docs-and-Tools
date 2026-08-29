import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_OBJECT_ITEMFRAME_CONTENTS extends BaseOperator<
  Entity,
  Item
> {
  static override internalName =
    "integrateddynamics:entity_itemframecontents" as const;
  static override numericID = 31;
  static override nicknames = [
    "entityItemframecontents",
    "entityItemFrameContents",
    "itemframecontents",
    "itemframeContents",
    "itemFrameContents",
    "ItemframeContents",
    "entity_item_frame_contents",
    "entity_itemframecontents",
    "item_frame_contents",
    "itemframe_contents",
  ];
  static override symbol = "itemframe_contents";
  static override interactName = "entityItemFrameContents";
  static override operatorName = "itemframecontents" as const;
  static override displayName = "Item Frame Contents" as const;
  static override fullDisplayName = "Entity Item Frame Contents" as const;
  static override stringDisplayNames = [
    "entity item frame contents",
    "entity item frame Contents",
    "entity item Frame contents",
    "entity item Frame Contents",
    "entity Item frame contents",
    "entity Item frame Contents",
    "entity Item Frame contents",
    "entity Item Frame Contents",
    "Entity item frame contents",
    "Entity item frame Contents",
    "Entity item Frame contents",
    "Entity item Frame Contents",
    "Entity Item frame contents",
    "Entity Item frame Contents",
    "Entity Item Frame contents",
    "Entity Item Frame Contents",
    "entity itemstack frame contents",
    "entity itemstack frame Contents",
    "entity itemstack Frame contents",
    "entity itemstack Frame Contents",
    "entity Itemstack frame contents",
    "entity Itemstack frame Contents",
    "entity Itemstack Frame contents",
    "entity Itemstack Frame Contents",
    "entity itemStack frame contents",
    "entity itemStack frame Contents",
    "entity itemStack Frame contents",
    "entity itemStack Frame Contents",
    "entity ItemStack frame contents",
    "entity ItemStack frame Contents",
    "entity ItemStack Frame contents",
    "entity ItemStack Frame Contents",
    "Entity itemstack frame contents",
    "Entity itemstack frame Contents",
    "Entity itemstack Frame contents",
    "Entity itemstack Frame Contents",
    "Entity Itemstack frame contents",
    "Entity Itemstack frame Contents",
    "Entity Itemstack Frame contents",
    "Entity Itemstack Frame Contents",
    "Entity itemStack frame contents",
    "Entity itemStack frame Contents",
    "Entity itemStack Frame contents",
    "Entity itemStack Frame Contents",
    "Entity ItemStack frame contents",
    "Entity ItemStack frame Contents",
    "Entity ItemStack Frame contents",
    "Entity ItemStack Frame Contents",
    "item frame contents",
    "item frame Contents",
    "item Frame contents",
    "item Frame Contents",
    "Item frame contents",
    "Item frame Contents",
    "Item Frame contents",
    "Item Frame Contents",
    "itemstack frame contents",
    "itemstack frame Contents",
    "itemstack Frame contents",
    "itemstack Frame Contents",
    "Itemstack frame contents",
    "Itemstack frame Contents",
    "Itemstack Frame contents",
    "Itemstack Frame Contents",
    "itemStack frame contents",
    "itemStack frame Contents",
    "itemStack Frame contents",
    "itemStack Frame Contents",
    "ItemStack frame contents",
    "ItemStack frame Contents",
    "ItemStack Frame contents",
    "ItemStack Frame Contents",
  ];
  static override tooltipInfo =
    "The contents from the given Item Frame." as const;

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
          to: {
            type: "Item",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): Item => {
        if (entity.isItemFrame().valueOf()) {
          return entity.getItemFrameContents();
        } else {
          throw new iError("Entity is not an item frame.");
        }
      },
    });
  }
}
