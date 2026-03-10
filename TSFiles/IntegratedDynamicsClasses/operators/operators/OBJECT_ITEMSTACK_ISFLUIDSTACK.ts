import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_OBJECT_ITEMSTACK_ISFLUIDSTACK extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_isfluidstack" as const;
  static override nicknames = [
    "itemstackIsFluidStack",
    "ItemstackIsfluidstack",
    "itemstack_is_fluidstack",
    "itemstackIsFluidstack",
    "itemHasFluid",
    "isFluidstack",
  ];
  static override symbol = "is_fluidstack";
  static override interactName = "itemstackIsFluidStack";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Boolean",
        },
      }),
      function: (item: Item): iBoolean => {
        return new iBoolean(item.getFluid().getAmount().gt(Integer.ZERO));
      },
    });
  }
}
