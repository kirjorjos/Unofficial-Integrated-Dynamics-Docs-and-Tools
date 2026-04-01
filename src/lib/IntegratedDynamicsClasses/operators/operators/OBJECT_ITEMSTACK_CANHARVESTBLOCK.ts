import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_ITEMSTACK_CANHARVESTBLOCK extends BaseOperator<
  Item,
  Operator<Block, iBoolean>
> {
  static override internalName =
    "integrateddynamics:itemstack_canharvest" as const;
  static override numericID = 187;
  static override nicknames = [
    "itemstackCanHarvest",
    "ItemstackCanHarvestBlock",
    "itemstack_can_harvest_block",
    "itemstackCanHarvestBlock",
    "canHarvestBlock",
    "canharvest",
    "itemstackCanharvest",
  ];
  static override symbol = "can_harvest";
  static override interactName = "itemstackCanHarvest";
  static override operatorName = "canharvest" as const;
  static override kind = "itemstack" as const;
  static override renderPattern = "INFIX_LONG" as const;
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
