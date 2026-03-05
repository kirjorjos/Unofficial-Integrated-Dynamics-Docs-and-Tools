import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Operator } from "../Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_ITEMSTACK_CANHARVESTBLOCK extends BaseOperator<
  Item,
  Operator<Block, iBoolean>
> {
  static override internalName =
    "integrateddynamics:itemstack_canharvest" as const;
  constructor() {
    super({
      nicknames: [
        "ItemstackCanHarvestBlock",
        "itemstack_can_harvest_block",
        "itemstackCanHarvestBlock",
        "canHarvestBlock",
      ],
      parsedSignature: new ParsedSignature({
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
            type: "Boolean",
          },
        },
      }),
      symbol: "can_harvest",
      interactName: "itemstackCanHarvest",
      function: (item: Item): TypeLambda<Block, iBoolean> => {
        return (block: Block): iBoolean => {
          return item.canHarvestBlock(block);
        };
      },
    });
  }
}
