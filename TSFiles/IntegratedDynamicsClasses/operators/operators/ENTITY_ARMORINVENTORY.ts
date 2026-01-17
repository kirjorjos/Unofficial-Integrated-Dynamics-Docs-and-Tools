import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_ENTITY_ARMORINVENTORY extends BaseOperator<
  Entity,
  iArray<Item>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_armorinventory",
      nicknames: [
        "EntityArmorinventory",
        "entity_armor_inventory",
        "entityArmorInventory",
        "entity_armor",
        "entityArmor",
        "armor_inventory",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "armor_inventory",
      interactName: "entityArmorInventory",
      function: (entity: Entity): iArray<Item> => {
        return entity.getArmorInventory();
      },
    });
  }
}
