import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_fluidstackcapacity" as const;
  static override nicknames = [
    "ItemstackFluidstackcapacity",
    "itemstack_fluidstack_capacity",
    "itemstackFluidstackCapacity",
    "item_fluid_capacity",
    "itemFluidCapacity",
    "item_fluidstack_capacity",
    "itemFluidstackCapacity",
    "fluidCapatity",
  ];
  static override symbol = "fluidstack_capacity";
  static override interactName = "itemstackFluidCapacity";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (item: Item): Integer => {
        return item.getFluidCapacity();
      },
    });
  }
}
