import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_ENTITY_HELDITEMOFFHAND extends BaseOperator<
  Entity,
  Item
> {
  static override internalName =
    "integrateddynamics:entity_helditemoffhand" as const;
  static override numericID = 107;
  static override nicknames = [
    "entityHeldItemOff",
    "EntityHelditemOff",
    "entityHelditemoffhand",
    "entityHeldItemOffHand",
    "heldItemOff",
    "helditemoffhand",
    "entity_held_item_off",
    "entity_held_item_off_hand",
    "entity_helditem_off",
    "entity_helditemoffhand",
    "held_item_2",
    "held_item_off",
  ];
  static override symbol = "held_item_2";
  static override interactName = "entityHeldItemOffHand";
  static override operatorName = "helditemoffhand" as const;
  static override displayName = "Held Item Offhand" as const;
  static override fullDisplayName = "Entity Held Item Offhand" as const;
  static override stringDisplayNames = [
    "held item offhand",
    "held item Offhand",
    "held Item offhand",
    "held Item Offhand",
    "Held item offhand",
    "Held item Offhand",
    "Held Item offhand",
    "Held Item Offhand",
    "held itemstack offhand",
    "held itemstack Offhand",
    "held Itemstack offhand",
    "held Itemstack Offhand",
    "held itemStack offhand",
    "held itemStack Offhand",
    "held ItemStack offhand",
    "held ItemStack Offhand",
    "Held itemstack offhand",
    "Held itemstack Offhand",
    "Held Itemstack offhand",
    "Held Itemstack Offhand",
    "Held itemStack offhand",
    "Held itemStack Offhand",
    "Held ItemStack offhand",
    "Held ItemStack Offhand",
    "entity held item offhand",
    "entity held item Offhand",
    "entity held Item offhand",
    "entity held Item Offhand",
    "entity Held item offhand",
    "entity Held item Offhand",
    "entity Held Item offhand",
    "entity Held Item Offhand",
    "Entity held item offhand",
    "Entity held item Offhand",
    "Entity held Item offhand",
    "Entity held Item Offhand",
    "Entity Held item offhand",
    "Entity Held item Offhand",
    "Entity Held Item offhand",
    "Entity Held Item Offhand",
    "entity held itemstack offhand",
    "entity held itemstack Offhand",
    "entity held Itemstack offhand",
    "entity held Itemstack Offhand",
    "entity held itemStack offhand",
    "entity held itemStack Offhand",
    "entity held ItemStack offhand",
    "entity held ItemStack Offhand",
    "entity Held itemstack offhand",
    "entity Held itemstack Offhand",
    "entity Held Itemstack offhand",
    "entity Held Itemstack Offhand",
    "entity Held itemStack offhand",
    "entity Held itemStack Offhand",
    "entity Held ItemStack offhand",
    "entity Held ItemStack Offhand",
    "Entity held itemstack offhand",
    "Entity held itemstack Offhand",
    "Entity held Itemstack offhand",
    "Entity held Itemstack Offhand",
    "Entity held itemStack offhand",
    "Entity held itemStack Offhand",
    "Entity held ItemStack offhand",
    "Entity held ItemStack Offhand",
    "Entity Held itemstack offhand",
    "Entity Held itemstack Offhand",
    "Entity Held Itemstack offhand",
    "Entity Held Itemstack Offhand",
    "Entity Held itemStack offhand",
    "Entity Held itemStack Offhand",
    "Entity Held ItemStack offhand",
    "Entity Held ItemStack Offhand",
  ];
  static override tooltipInfo =
    "The item the given entity is currently holding in its off hand." as const;

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
        return entity.getHeldItemOffHand();
      },
    });
  }
}
