import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_ENTITY_HELDITEM extends BaseOperator<Entity, Item> {
  static override internalName = "integrateddynamics:entity_helditem" as const;
  static override numericID = 93;
  static override nicknames = [
    "entityHelditem",
    "entityHeldItem",
    "entityHeldItemMain",
    "EntityHelditemMain",
    "helditem",
    "heldItemMain",
    "entity_held_item",
    "entity_held_item_main",
    "entity_helditem",
    "entity_helditem_main",
    "held_item_1",
    "held_item_main",
  ];
  static override symbol = "held_item_1";
  static override interactName = "entityHeldItem";
  static override operatorName = "helditem" as const;
  static override displayName = "Held Item Mainhand" as const;
  static override fullDisplayName = "Entity Held Item Mainhand" as const;
  static override stringDisplayNames = [
    "held item mainhand",
    "held item Mainhand",
    "held Item mainhand",
    "held Item Mainhand",
    "Held item mainhand",
    "Held item Mainhand",
    "Held Item mainhand",
    "Held Item Mainhand",
    "held itemstack mainhand",
    "held itemstack Mainhand",
    "held Itemstack mainhand",
    "held Itemstack Mainhand",
    "held itemStack mainhand",
    "held itemStack Mainhand",
    "held ItemStack mainhand",
    "held ItemStack Mainhand",
    "Held itemstack mainhand",
    "Held itemstack Mainhand",
    "Held Itemstack mainhand",
    "Held Itemstack Mainhand",
    "Held itemStack mainhand",
    "Held itemStack Mainhand",
    "Held ItemStack mainhand",
    "Held ItemStack Mainhand",
    "entity held item mainhand",
    "entity held item Mainhand",
    "entity held Item mainhand",
    "entity held Item Mainhand",
    "entity Held item mainhand",
    "entity Held item Mainhand",
    "entity Held Item mainhand",
    "entity Held Item Mainhand",
    "Entity held item mainhand",
    "Entity held item Mainhand",
    "Entity held Item mainhand",
    "Entity held Item Mainhand",
    "Entity Held item mainhand",
    "Entity Held item Mainhand",
    "Entity Held Item mainhand",
    "Entity Held Item Mainhand",
    "entity held itemstack mainhand",
    "entity held itemstack Mainhand",
    "entity held Itemstack mainhand",
    "entity held Itemstack Mainhand",
    "entity held itemStack mainhand",
    "entity held itemStack Mainhand",
    "entity held ItemStack mainhand",
    "entity held ItemStack Mainhand",
    "entity Held itemstack mainhand",
    "entity Held itemstack Mainhand",
    "entity Held Itemstack mainhand",
    "entity Held Itemstack Mainhand",
    "entity Held itemStack mainhand",
    "entity Held itemStack Mainhand",
    "entity Held ItemStack mainhand",
    "entity Held ItemStack Mainhand",
    "Entity held itemstack mainhand",
    "Entity held itemstack Mainhand",
    "Entity held Itemstack mainhand",
    "Entity held Itemstack Mainhand",
    "Entity held itemStack mainhand",
    "Entity held itemStack Mainhand",
    "Entity held ItemStack mainhand",
    "Entity held ItemStack Mainhand",
    "Entity Held itemstack mainhand",
    "Entity Held itemstack Mainhand",
    "Entity Held Itemstack mainhand",
    "Entity Held Itemstack Mainhand",
    "Entity Held itemStack mainhand",
    "Entity Held itemStack Mainhand",
    "Entity Held ItemStack mainhand",
    "Entity Held ItemStack Mainhand",
  ];
  static override tooltipInfo =
    "The item the given entity is currently holding in its main hand." as const;

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
        return entity.getHeldItemMain();
      },
    });
  }
}
