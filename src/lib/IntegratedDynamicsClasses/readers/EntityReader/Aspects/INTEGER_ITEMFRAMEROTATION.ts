import { EntityAspectBase } from "lib/IntegratedDynamicsClasses/readers/EntityReader/EntityAspectBase";

export class ENTITY_INTEGER_ITEMFRAMEROTATION extends EntityAspectBase {
  static displayName = "itemFrameRotation";
  static fullDisplayName = "Item Frame Rotation";
  static nicknames = [
    "itemFrameRotation",
    "item_frame_rotation",
    "rotation",
    "frameRotation",
    "frame_rotation",
  ];
  static settings = {};
  static icon = "integer/entity/itemframerotation";
  static outputType = "Integer";
}
