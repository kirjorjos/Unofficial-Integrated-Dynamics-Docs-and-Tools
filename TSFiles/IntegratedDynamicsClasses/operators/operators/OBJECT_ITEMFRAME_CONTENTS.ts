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
  constructor() {
    super({
      nicknames: [
        "ItemframeContents",
        "itemframe_contents",
        "itemframeContents",
        "item_frame_contents",
        "itemFrameContents",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Item",
        },
      }),
      symbol: "itemframe_contents",
      interactName: "entityItemFrameContents",
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
