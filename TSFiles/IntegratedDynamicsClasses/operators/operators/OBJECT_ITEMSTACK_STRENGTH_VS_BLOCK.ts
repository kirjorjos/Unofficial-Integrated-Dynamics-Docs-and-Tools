import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Operator } from "../Operator";
import { Double } from "JavaNumberClasses/Double";

export class OPERATOR_OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK extends BaseOperator<
  Item,
  Operator<Block, Double>
> {
  static override internalName =
    "integrateddynamics:itemstack_strength" as const;
  static override numericID = 65;
  static override nicknames = [
    "itemstackStrength",
    "ItemstackStrengthVsBlock",
    "itemstack_strength_vs_block",
    "itemstackStrengthVsBlock",
    "strengthVsBlock",
  ];
  static override symbol = "strength";
  static override interactName = "itemstackStrength";
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
