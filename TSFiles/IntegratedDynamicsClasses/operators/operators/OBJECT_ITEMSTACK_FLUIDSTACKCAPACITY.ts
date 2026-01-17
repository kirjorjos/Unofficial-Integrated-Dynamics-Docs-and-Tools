import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY extends BaseOperator<
  Item,
  Integer
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_fluidstackcapacity",
      nicknames: [
        "ItemstackFluidstackcapacity",
        "itemstack_fluidstack_capacity",
        "itemstackFluidstackCapacity",
        "item_fluid_capacity",
        "itemFluidCapacity",
        "item_fluidstack_capacity",
        "itemFluidstackCapacity",
        "fluidCapatity",
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
      symbol: "fluidstack_capacity",
      interactName: "itemstackFluidCapacity",
      function: (item: Item): Integer => {
        return item.getFluidCapacity();
      },
    });
  }
}
