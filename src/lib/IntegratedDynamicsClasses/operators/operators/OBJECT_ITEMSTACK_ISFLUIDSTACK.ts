import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_OBJECT_ITEMSTACK_ISFLUIDSTACK extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_isfluidstack" as const;
  static override numericID = 56;
  static override nicknames = [
    "isfluidstack",
    "isFluidstack",
    "itemHasFluid",
    "itemstackIsfluidstack",
    "itemstackIsFluidstack",
    "itemstackIsFluidStack",
    "ItemstackIsfluidstack",
    "is_fluidstack",
    "item_has_fluid",
    "itemstack_is_fluid_stack",
    "itemstack_is_fluidstack",
    "itemstack_isfluidstack",
  ];
  static override symbol = "is_fluidstack";
  static override interactName = "itemstackIsFluidStack";
  static override operatorName = "isfluidstack" as const;
  static override displayName = "Has Fluid" as const;
  static override fullDisplayName = "Item Has Fluid" as const;
  static override tooltipInfo = "If the given item has a fluid" as const;

  static override kind = "itemstack" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (item: Item): iBoolean => {
        return new iBoolean(item.getFluid().getAmount().gt(Integer.ZERO));
      },
    });
  }
}
