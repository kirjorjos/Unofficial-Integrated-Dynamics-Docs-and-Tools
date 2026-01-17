import { globalMap } from "HelperClasses/TypeMap";
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
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_canharvest",
      nicknames: [
        "ItemstackCanHarvestBlock",
        "itemstack_can_harvest_block",
        "itemstackCanHarvestBlock",
        "canHarvestBlock",
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
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "can_harvest",
      interactName: "itemstackCanHarvest",
      function: (_item: Item): TypeLambda<Block, iBoolean> => {
        return (_block: Block): iBoolean => {
          throw new Error("Can harvest block not currently implemented");
          // return item.canHarvestBlock(block);
        };
      },
    });
  }
}
