import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_PLANTTYPE extends BaseOperator<
  Item,
  iString
> {
  static override internalName =
    "integrateddynamics:itemstack_plant_type" as const;
  static override numericID = 125;
  static override nicknames = ["plant_type", "planttype", "plantType"];
  static override symbol = "plant_type";
  static override interactName = "plantType";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): iString => {
        return item.getPlantType();
      },
    });
  }
}
