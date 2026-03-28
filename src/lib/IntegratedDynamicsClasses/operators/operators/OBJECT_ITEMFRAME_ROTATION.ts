import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_OBJECT_ITEMFRAME_ROTATION extends BaseOperator<
  Entity,
  Integer
> {
  static override internalName =
    "integrateddynamics:entity_itemframerotation" as const;
  static override numericID = 32;
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
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Integer",
          },
        },
        normalizeSignature
      ),
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
