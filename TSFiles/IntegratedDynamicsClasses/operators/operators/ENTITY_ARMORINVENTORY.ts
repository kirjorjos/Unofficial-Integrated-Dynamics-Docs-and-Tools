import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_ENTITY_ARMORINVENTORY extends BaseOperator<
  Entity,
  iArray<Item>
> {
  static override internalName =
    "integrateddynamics:entity_armorinventory" as const;
  static override numericID = 90;
  static override nicknames = [
    "EntityArmorinventory",
    "entity_armor_inventory",
    "entityArmorInventory",
    "entity_armor",
    "entityArmor",
    "armor_inventory",
  ];
  static override symbol = "armor_inventory";
  static override interactName = "entityArmorInventory";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iArray<Item> => {
        return entity.getArmorInventory();
      },
    });
  }
}
