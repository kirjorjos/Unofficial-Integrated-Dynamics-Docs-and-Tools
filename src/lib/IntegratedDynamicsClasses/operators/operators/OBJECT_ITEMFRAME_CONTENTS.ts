import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

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
          throw new Error("Entity is not an item frame.");
        }
      },
    });
  }
}
