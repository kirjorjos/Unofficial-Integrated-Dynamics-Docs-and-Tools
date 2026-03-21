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
  static override nicknames = [
    "itemstackCanHarvest",
    "ItemstackCanHarvestBlock",
    "itemstack_can_harvest_block",
    "itemstackCanHarvestBlock",
    "canHarvestBlock",
  ];
  static override symbol = "can_harvest";
  static override interactName = "itemstackCanHarvest";
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
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (item: Item): TypeLambda<Block, iBoolean> => {
        return (block: Block): iBoolean => {
          return item.canHarvestBlock(block);
        };
      },
    });
  }
}
