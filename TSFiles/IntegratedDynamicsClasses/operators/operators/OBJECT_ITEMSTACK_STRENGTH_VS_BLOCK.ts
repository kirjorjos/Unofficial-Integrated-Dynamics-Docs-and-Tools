import { TypeMap } from "HelperClasses/TypeMap";
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
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_strength",
      nicknames: [
        "ItemstackStrengthVsBlock",
        "itemstack_strength_vs_block",
        "itemstackStrengthVsBlock",
        "strengthVsBlock",
      ],
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
        globalMap
      ),
      symbol: "strength",
      interactName: "itemstackStrength",
      function: (_item: Item): TypeLambda<Block, Double> => {
        return (_block: Block): Double => {
          throw new Error("Strength vs Block not currently implemented");
          // return item.getStrengthVsBlock(block);
        };
      },
    });
  }
}
