import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { Double } from "lib/JavaNumberClasses/Double";

export class OPERATOR_OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK extends BaseOperator<
  Item,
  Operator<Block, Double>
> {
  static override internalName =
    "integrateddynamics:itemstack_strength" as const;
  static override numericID = 65;
  static override nicknames = [
    "itemstackStrength",
    "itemstackStrengthVsBlock",
    "ItemstackStrengthVsBlock",
    "strength",
    "strengthVsBlock",
    "itemstack_strength",
    "itemstack_strength_vs_block",
    "strength_vs_block",
  ];
  static override symbol = "strength";
  static override interactName = "itemstackStrength";
  static override operatorName = "strength" as const;
  static override displayName = "Strength vs Block" as const;
  static override fullDisplayName = "Item Strength vs Block" as const;
  static override stringDisplayNames = [
    "item strength vs block",
    "item strength vs Block",
    "item strength Vs block",
    "item strength Vs Block",
    "item Strength vs block",
    "item Strength vs Block",
    "item Strength Vs block",
    "item Strength Vs Block",
    "Item strength vs block",
    "Item strength vs Block",
    "Item strength Vs block",
    "Item strength Vs Block",
    "Item Strength vs block",
    "Item Strength vs Block",
    "Item Strength Vs block",
    "Item Strength Vs Block",
    "itemstack strength vs block",
    "itemstack strength vs Block",
    "itemstack strength Vs block",
    "itemstack strength Vs Block",
    "itemstack Strength vs block",
    "itemstack Strength vs Block",
    "itemstack Strength Vs block",
    "itemstack Strength Vs Block",
    "Itemstack strength vs block",
    "Itemstack strength vs Block",
    "Itemstack strength Vs block",
    "Itemstack strength Vs Block",
    "Itemstack Strength vs block",
    "Itemstack Strength vs Block",
    "Itemstack Strength Vs block",
    "Itemstack Strength Vs Block",
    "itemStack strength vs block",
    "itemStack strength vs Block",
    "itemStack strength Vs block",
    "itemStack strength Vs Block",
    "itemStack Strength vs block",
    "itemStack Strength vs Block",
    "itemStack Strength Vs block",
    "itemStack Strength Vs Block",
    "ItemStack strength vs block",
    "ItemStack strength vs Block",
    "ItemStack strength Vs block",
    "ItemStack strength Vs Block",
    "ItemStack Strength vs block",
    "ItemStack Strength vs Block",
    "ItemStack Strength Vs block",
    "ItemStack Strength Vs Block",
    "strength vs block",
    "strength vs Block",
    "strength Vs block",
    "strength Vs Block",
    "Strength vs block",
    "Strength vs Block",
    "Strength Vs block",
    "Strength Vs Block",
  ];
  static override tooltipInfo =
    "The strength this item has against the given block" as const;

  static override kind = "itemstack" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "Double",
            },
          },
        },
        normalizeSignature
      ),
      function: (item: Item): TypeLambda<Block, Double> => {
        return (block: Block): Double => {
          return item.getStrengthVsBlock(block);
        };
      },
    });
  }
}
