import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_OBJECT_ITEMFRAME_ROTATION extends BaseOperator<
  Entity,
  Integer
> {
  static override internalName =
    "integrateddynamics:entity_itemframerotation" as const;
  static override nicknames = [
    "entityItemFrameRotation",
    "ItemframeRotation",
    "itemframe_rotation",
    "itemframeRotation",
    "item_frame_rotation",
    "itemFrameRotation",
  ];
  static override symbol = "itemframe_rotation";
  static override interactName = "entityItemFrameRotation";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (entity: Entity): Integer => {
        if (entity.isItemFrame().valueOf()) {
          return entity.getItemFrameRotation();
        } else {
          throw new Error("Entity is not an item frame.");
        }
      },
    });
  }
}
