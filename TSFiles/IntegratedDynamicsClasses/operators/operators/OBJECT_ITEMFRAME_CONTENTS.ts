import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMFRAME_CONTENTS extends BaseOperator<
  Entity,
  Item
> {
  static override internalName =
    "integrateddynamics:entity_itemframecontents" as const;
  static override numericID = 31;
  static override nicknames = [
    "entityItemFrameContents",
    "ItemframeContents",
    "itemframe_contents",
    "itemframeContents",
    "item_frame_contents",
    "itemFrameContents",
  ];
  static override symbol = "itemframe_contents";
  static override interactName = "entityItemFrameContents";
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
