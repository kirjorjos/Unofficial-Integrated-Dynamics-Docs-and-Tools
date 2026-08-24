import { EntityAspectBase } from "lib/IntegratedDynamicsClasses/readers/EntityReader/EntityAspectBase";

export class ENTITY_ITEMSTACK_ITEMFRAMECONTENTS extends EntityAspectBase {
  static displayName = "itemFrame";
  static fullDisplayName = "Item Frame";
  static nicknames = [
    "itemFrame",
    "item_frame",
    "itemFrameContents",
    "item_frame_contents",
    "frameContents",
    "frame_contents",
  ];
  static settings = {};
  static icon = "itemstack/entity/itemframecontents";
  static outputType = "Item";
  static tooltipInfo = "The item in an Item Frame attached to the reader";
}
