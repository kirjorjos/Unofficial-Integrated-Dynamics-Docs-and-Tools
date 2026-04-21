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
