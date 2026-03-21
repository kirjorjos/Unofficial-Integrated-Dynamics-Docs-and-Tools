import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISPLANTABLE extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_is_plantable" as const;
  static override nicknames = ["is_plantable", "isplantable", "isPlantable"];
  static override symbol = "is_plantable";
  static override interactName = "isPlantable";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): iBoolean => {
        return item.isPlantable();
      },
    });
  }
}
