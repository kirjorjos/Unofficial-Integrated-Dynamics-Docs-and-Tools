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
  constructor() {
    super({
      nicknames: ["plant_type", "planttype", "plantType"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "String",
        },
      }),
      symbol: "plant_type",
      interactName: "plantType",
      function: (item: Item): iString => {
        return item.getPlantType();
      },
    });
  }
}
