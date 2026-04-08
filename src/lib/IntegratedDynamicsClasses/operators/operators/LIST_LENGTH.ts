import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_LIST_LENGTH extends BaseOperator<
  iArray<IntegratedValue>,
  Integer
> {
  static override internalName = "integrateddynamics:list_length" as const;
  static override numericID = 67;
  static override nicknames = ["listLength", "length"];
  static override symbol = "| |";
  static override interactName = "listLength";
  static override operatorName = "length" as const;
  static override displayName = "Length" as const;
  static override fullDisplayName = "List Length" as const;
  static override tooltipInfo = "The length of the given list" as const;

  static override kind = "list" as const;
  static override renderPattern = "PREFIX_1" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (list: iArray<IntegratedValue>): Integer => {
        return list.size();
      },
    });
  }
}
