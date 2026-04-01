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
    "EntityHelditemOff",
    "entity_held_item_off",
    "entityHeldItemOff",
    "heldItemOff",
    "entityHeldItemOffHand",
    "held_item_2",
    "helditemoffhand",
    "entityHelditemoffhand",
  ];
  static override symbol = "held_item_2";
  static override interactName = "entityHeldItemOffHand";
  static override operatorName = "helditemoffhand" as const;
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
