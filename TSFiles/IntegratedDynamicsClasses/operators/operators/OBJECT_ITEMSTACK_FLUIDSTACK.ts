import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FLUIDSTACK extends BaseOperator<
  Item,
  Fluid
> {
  static override internalName =
    "integrateddynamics:itemstack_fluidstack" as const;
  constructor() {
    super({
      nicknames: [
        "ItemstackFluidstack",
        "itemstack_fluidstack",
        "itemstackFluidstack",
        "itemFluidstack",
        "item_fluidstack",
        "itemFluid",
        "item_fluid",
        "itemstack_fluid",
        "itemstackFluid",
        "itemFluid",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Fluid",
        },
      }),
      symbol: "fluidstack",
      interactName: "itemstackFluidStack",
      function: (item: Item): Fluid => {
        return item.getFluid();
      },
    });
  }
}
