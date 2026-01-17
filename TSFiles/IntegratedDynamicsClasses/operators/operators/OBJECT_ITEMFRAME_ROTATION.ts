import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_OBJECT_ITEMFRAME_ROTATION extends BaseOperator<
  Entity,
  Integer
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_itemframerotation",
      nicknames: [
        "ItemframeRotation",
        "itemframe_rotation",
        "itemframeRotation",
        "item_frame_rotation",
        "itemFrameRotation",
      ],
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
        globalMap
      ),
      symbol: "itemframe_rotation",
      interactName: "entityItemFrameRotation",
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
