import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_PLANTTYPE extends BaseOperator<
  Item,
  iString
> {
  static override internalName =
    "integrateddynamics:itemstack_plant_type" as const;
  static override numericID = 125;
  static override nicknames = [
    "plant_type",
    "planttype",
    "plantType",
    "itemstackPlanttype",
  ];
  static override symbol = "plant_type";
  static override interactName = "plantType";
  static override operatorName = "planttype" as const;
  static override displayName = "Item Plant Type" as const;
  static override fullDisplayName = "Item Item Plant Type" as const;
  static override tooltipInfo = "The plant type of the given item" as const;

  static override kind = "itemstack" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
