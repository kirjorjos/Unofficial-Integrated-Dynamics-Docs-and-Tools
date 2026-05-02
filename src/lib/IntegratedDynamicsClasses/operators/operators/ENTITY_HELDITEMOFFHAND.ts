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
