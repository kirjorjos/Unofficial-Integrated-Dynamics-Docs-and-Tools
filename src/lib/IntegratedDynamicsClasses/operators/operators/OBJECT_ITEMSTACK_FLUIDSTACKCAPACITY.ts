import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_fluidstackcapacity" as const;
  static override numericID = 55;
  static override nicknames = [
    "fluidCapatity",
    "fluidstackcapacity",
    "itemFluidCapacity",
    "itemFluidstackCapacity",
    "itemstackFluidCapacity",
    "itemstackFluidstackcapacity",
    "itemstackFluidstackCapacity",
    "ItemstackFluidstackcapacity",
    "fluid_capatity",
    "item_fluid_capacity",
    "item_fluidstack_capacity",
    "itemstack_fluid_capacity",
    "itemstack_fluidstack_capacity",
    "itemstack_fluidstackcapacity",
  ];
  static override symbol = "fluidstack_capacity";
  static override interactName = "itemstackFluidCapacity";
  static override operatorName = "fluidstackcapacity" as const;
  static override displayName = "Fluid Capacity" as const;
  static override fullDisplayName = "Item Fluid Capacity" as const;
  static override stringDisplayNames = [
    "item fluid capacity",
    "item fluid Capacity",
    "item Fluid capacity",
    "item Fluid Capacity",
    "Item fluid capacity",
    "Item fluid Capacity",
    "Item Fluid capacity",
    "Item Fluid Capacity",
    "item fluidstack capacity",
    "item fluidstack Capacity",
    "item Fluidstack capacity",
    "item Fluidstack Capacity",
    "item fluidStack capacity",
    "item fluidStack Capacity",
    "item FluidStack capacity",
    "item FluidStack Capacity",
    "Item fluidstack capacity",
    "Item fluidstack Capacity",
    "Item Fluidstack capacity",
    "Item Fluidstack Capacity",
    "Item fluidStack capacity",
    "Item fluidStack Capacity",
    "Item FluidStack capacity",
    "Item FluidStack Capacity",
    "itemstack fluid capacity",
    "itemstack fluid Capacity",
    "itemstack Fluid capacity",
    "itemstack Fluid Capacity",
    "Itemstack fluid capacity",
    "Itemstack fluid Capacity",
    "Itemstack Fluid capacity",
    "Itemstack Fluid Capacity",
    "itemStack fluid capacity",
    "itemStack fluid Capacity",
    "itemStack Fluid capacity",
    "itemStack Fluid Capacity",
    "ItemStack fluid capacity",
    "ItemStack fluid Capacity",
    "ItemStack Fluid capacity",
    "ItemStack Fluid Capacity",
    "itemstack fluidstack capacity",
    "itemstack fluidstack Capacity",
    "itemstack Fluidstack capacity",
    "itemstack Fluidstack Capacity",
    "itemstack fluidStack capacity",
    "itemstack fluidStack Capacity",
    "itemstack FluidStack capacity",
    "itemstack FluidStack Capacity",
    "Itemstack fluidstack capacity",
    "Itemstack fluidstack Capacity",
    "Itemstack Fluidstack capacity",
    "Itemstack Fluidstack Capacity",
    "Itemstack fluidStack capacity",
    "Itemstack fluidStack Capacity",
    "Itemstack FluidStack capacity",
    "Itemstack FluidStack Capacity",
    "itemStack fluidstack capacity",
    "itemStack fluidstack Capacity",
    "itemStack Fluidstack capacity",
    "itemStack Fluidstack Capacity",
    "itemStack fluidStack capacity",
    "itemStack fluidStack Capacity",
    "itemStack FluidStack capacity",
    "itemStack FluidStack Capacity",
    "ItemStack fluidstack capacity",
    "ItemStack fluidstack Capacity",
    "ItemStack Fluidstack capacity",
    "ItemStack Fluidstack Capacity",
    "ItemStack fluidStack capacity",
    "ItemStack fluidStack Capacity",
    "ItemStack FluidStack capacity",
    "ItemStack FluidStack Capacity",
    "fluid capacity",
    "fluid Capacity",
    "Fluid capacity",
    "Fluid Capacity",
    "fluidstack capacity",
    "fluidstack Capacity",
    "Fluidstack capacity",
    "Fluidstack Capacity",
    "fluidStack capacity",
    "fluidStack Capacity",
    "FluidStack capacity",
    "FluidStack Capacity",
  ];
  static override tooltipInfo =
    "The fluid capacity of the given item in mB" as const;

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
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): Integer => {
        return item.getFluidCapacity();
      },
    });
  }
}
