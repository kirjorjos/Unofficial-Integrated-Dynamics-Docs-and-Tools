import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_PLANT extends BaseOperator<Item, Block> {
  static override internalName = "integrateddynamics:itemstack_plant" as const;
  static override nicknames = ["plant"];
  static override symbol = "plant";
  static override interactName = "plant";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Block",
        },
      }),
      function: (item: Item): Block => {
        return item.getPlant();
      },
    });
  }
}
