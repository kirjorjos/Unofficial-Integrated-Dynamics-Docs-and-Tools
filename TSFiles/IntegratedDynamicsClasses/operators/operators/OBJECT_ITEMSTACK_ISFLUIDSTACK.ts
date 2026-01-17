import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_OBJECT_ITEMSTACK_ISFLUIDSTACK extends BaseOperator<
  Item,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_isfluidstack",
      nicknames: [
        "ItemstackIsfluidstack",
        "itemstack_is_fluidstack",
        "itemstackIsFluidstack",
        "itemHasFluid",
        "isFluidstack",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_fluidstack",
      interactName: "itemstackIsFluidStack",
      function: (item: Item): iBoolean => {
        return new iBoolean(item.getFluid().getAmount().gt(Integer.ZERO));
      },
    });
  }
}
