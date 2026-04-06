import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_ENTITY_HELDITEM extends BaseOperator<Entity, Item> {
  static override internalName = "integrateddynamics:entity_helditem" as const;
  static override numericID = 93;
  static override nicknames = [
    "EntityHelditemMain",
    "entity_held_item_main",
    "entityHeldItemMain",
    "heldItemMain",
    "held_item_1",
    "entityHeldItem",
    "helditem",
    "entityHelditem",
  ];
  static override symbol = "held_item_1";
  static override interactName = "entityHeldItem";
  static override operatorName = "helditem" as const;
  static override displayName = "Held Item Mainhand" as const;
  static override fullDisplayName = "Entity Held Item Mainhand" as const;
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
