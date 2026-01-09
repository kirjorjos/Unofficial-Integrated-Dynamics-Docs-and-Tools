import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FUELBURNTIME extends BaseOperator<
  Item,
  Integer
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_burntime",
      nicknames: [
        "ItemstackFuelburntime",
        "item_fuel_burn_time",
        "itemFuelBurnTime",
        "fuelBurnTime",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "burn_time",
      interactName: "itemstackBurnTime",
      function: (item: Item): Integer => {
        return item.getFuelBurnTime();
      },
    });
  }
}
