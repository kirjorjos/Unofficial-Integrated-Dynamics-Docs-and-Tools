import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_OBJECT_ITEMFRAME_ROTATION extends BaseOperator<
  Entity,
  Integer
> {
  static override internalName =
    "integrateddynamics:entity_itemframerotation" as const;
  static override numericID = 32;
  static override nicknames = [
    "entityItemframerotation",
    "entityItemFrameRotation",
    "itemframerotation",
    "itemframeRotation",
    "itemFrameRotation",
    "ItemframeRotation",
    "entity_item_frame_rotation",
    "entity_itemframerotation",
    "item_frame_rotation",
    "itemframe_rotation",
  ];
  static override symbol = "itemframe_rotation";
  static override interactName = "entityItemFrameRotation";
  static override operatorName = "itemframerotation" as const;
  static override displayName = "Item Frame Rotation" as const;
  static override fullDisplayName = "Entity Item Frame Rotation" as const;
  static override stringDisplayNames = [
    "entity item frame rotation",
    "entity item frame Rotation",
    "entity item Frame rotation",
    "entity item Frame Rotation",
    "entity Item frame rotation",
    "entity Item frame Rotation",
    "entity Item Frame rotation",
    "entity Item Frame Rotation",
    "Entity item frame rotation",
    "Entity item frame Rotation",
    "Entity item Frame rotation",
    "Entity item Frame Rotation",
    "Entity Item frame rotation",
    "Entity Item frame Rotation",
    "Entity Item Frame rotation",
    "Entity Item Frame Rotation",
    "entity itemstack frame rotation",
    "entity itemstack frame Rotation",
    "entity itemstack Frame rotation",
    "entity itemstack Frame Rotation",
    "entity Itemstack frame rotation",
    "entity Itemstack frame Rotation",
    "entity Itemstack Frame rotation",
    "entity Itemstack Frame Rotation",
    "entity itemStack frame rotation",
    "entity itemStack frame Rotation",
    "entity itemStack Frame rotation",
    "entity itemStack Frame Rotation",
    "entity ItemStack frame rotation",
    "entity ItemStack frame Rotation",
    "entity ItemStack Frame rotation",
    "entity ItemStack Frame Rotation",
    "Entity itemstack frame rotation",
    "Entity itemstack frame Rotation",
    "Entity itemstack Frame rotation",
    "Entity itemstack Frame Rotation",
    "Entity Itemstack frame rotation",
    "Entity Itemstack frame Rotation",
    "Entity Itemstack Frame rotation",
    "Entity Itemstack Frame Rotation",
    "Entity itemStack frame rotation",
    "Entity itemStack frame Rotation",
    "Entity itemStack Frame rotation",
    "Entity itemStack Frame Rotation",
    "Entity ItemStack frame rotation",
    "Entity ItemStack frame Rotation",
    "Entity ItemStack Frame rotation",
    "Entity ItemStack Frame Rotation",
    "item frame rotation",
    "item frame Rotation",
    "item Frame rotation",
    "item Frame Rotation",
    "Item frame rotation",
    "Item frame Rotation",
    "Item Frame rotation",
    "Item Frame Rotation",
    "itemstack frame rotation",
    "itemstack frame Rotation",
    "itemstack Frame rotation",
    "itemstack Frame Rotation",
    "Itemstack frame rotation",
    "Itemstack frame Rotation",
    "Itemstack Frame rotation",
    "Itemstack Frame Rotation",
    "itemStack frame rotation",
    "itemStack frame Rotation",
    "itemStack Frame rotation",
    "itemStack Frame Rotation",
    "ItemStack frame rotation",
    "ItemStack frame Rotation",
    "ItemStack Frame rotation",
    "ItemStack Frame Rotation",
  ];
  static override tooltipInfo =
    "The rotation from the given Item Frame." as const;

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
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): Integer => {
        if (entity.isItemFrame().valueOf()) {
          return entity.getItemFrameRotation();
        } else {
          throw new iError("Entity is not an item frame.");
        }
      },
    });
  }
}
