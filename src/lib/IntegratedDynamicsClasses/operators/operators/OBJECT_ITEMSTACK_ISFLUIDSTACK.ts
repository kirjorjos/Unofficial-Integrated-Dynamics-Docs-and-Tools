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
  static override stringDisplayNames = [
    "item has fluid",
    "item has Fluid",
    "item Has fluid",
    "item Has Fluid",
    "Item has fluid",
    "Item has Fluid",
    "Item Has fluid",
    "Item Has Fluid",
    "item has fluidstack",
    "item has Fluidstack",
    "item has fluidStack",
    "item has FluidStack",
    "item Has fluidstack",
    "item Has Fluidstack",
    "item Has fluidStack",
    "item Has FluidStack",
    "Item has fluidstack",
    "Item has Fluidstack",
    "Item has fluidStack",
    "Item has FluidStack",
    "Item Has fluidstack",
    "Item Has Fluidstack",
    "Item Has fluidStack",
    "Item Has FluidStack",
    "itemstack has fluid",
    "itemstack has Fluid",
    "itemstack Has fluid",
    "itemstack Has Fluid",
    "Itemstack has fluid",
    "Itemstack has Fluid",
    "Itemstack Has fluid",
    "Itemstack Has Fluid",
    "itemStack has fluid",
    "itemStack has Fluid",
    "itemStack Has fluid",
    "itemStack Has Fluid",
    "ItemStack has fluid",
    "ItemStack has Fluid",
    "ItemStack Has fluid",
    "ItemStack Has Fluid",
    "itemstack has fluidstack",
    "itemstack has Fluidstack",
    "itemstack has fluidStack",
    "itemstack has FluidStack",
    "itemstack Has fluidstack",
    "itemstack Has Fluidstack",
    "itemstack Has fluidStack",
    "itemstack Has FluidStack",
    "Itemstack has fluidstack",
    "Itemstack has Fluidstack",
    "Itemstack has fluidStack",
    "Itemstack has FluidStack",
    "Itemstack Has fluidstack",
    "Itemstack Has Fluidstack",
    "Itemstack Has fluidStack",
    "Itemstack Has FluidStack",
    "itemStack has fluidstack",
    "itemStack has Fluidstack",
    "itemStack has fluidStack",
    "itemStack has FluidStack",
    "itemStack Has fluidstack",
    "itemStack Has Fluidstack",
    "itemStack Has fluidStack",
    "itemStack Has FluidStack",
    "ItemStack has fluidstack",
    "ItemStack has Fluidstack",
    "ItemStack has fluidStack",
    "ItemStack has FluidStack",
    "ItemStack Has fluidstack",
    "ItemStack Has Fluidstack",
    "ItemStack Has fluidStack",
    "ItemStack Has FluidStack",
    "has fluid",
    "has Fluid",
    "Has fluid",
    "Has Fluid",
    "has fluidstack",
    "has Fluidstack",
    "has fluidStack",
    "has FluidStack",
    "Has fluidstack",
    "Has Fluidstack",
    "Has fluidStack",
    "Has FluidStack",
  ];
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
