import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_HELDITEMOFFHAND extends BaseOperator<
  Entity,
  Item
> {
  static override internalName =
    "integrateddynamics:entity_helditemoffhand" as const;
  static override nicknames = [
    "EntityHelditemOff",
    "entity_held_item_off",
    "entityHeldItemOff",
    "heldItemOff",
    "entityHeldItemOffHand",
    "held_item_2",
  ];
  static override symbol = "held_item_2";
  static override interactName = "entityHeldItemOffHand";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Item",
        },
      }),
      function: (entity: Entity): Item => {
        return entity.getHeldItemOffHand();
      },
    });
  }
}
