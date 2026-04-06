import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

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
    "armorinventory",
    "entityArmorinventory",
  ];
  static override symbol = "armor_inventory";
  static override interactName = "entityArmorInventory";
  static override operatorName = "armorinventory" as const;
  static override displayName = "Armor Inventory" as const;
  static override fullDisplayName = "Entity Armor Inventory" as const;
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
