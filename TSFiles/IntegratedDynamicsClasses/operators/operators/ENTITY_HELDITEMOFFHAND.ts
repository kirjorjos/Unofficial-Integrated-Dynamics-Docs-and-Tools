import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ENTITY_HELDITEMOFFHAND extends BaseOperator<
  Entity,
  Item
> {
  static override internalName =
    "integrateddynamics:entity_helditemoffhand" as const;
  constructor() {
    super({
      nicknames: [
        "EntityHelditemOff",
        "entity_held_item_off",
        "entityHeldItemOff",
        "heldItemOff",
        "entityHeldItemOffHand",
        "held_item_2",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Item",
        },
      }),
      symbol: "held_item_2",
      interactName: "entityHeldItemOffHand",
      function: (entity: Entity): Item => {
        return entity.getHeldItemOffHand();
      },
    });
  }
}
