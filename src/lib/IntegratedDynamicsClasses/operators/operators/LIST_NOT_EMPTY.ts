import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_LIST_NOT_EMPTY extends BaseOperator<
  iArray<IntegratedValue>,
  iBoolean
> {
  static override internalName = "integrateddynamics:list_notempty" as const;
  static override numericID = 106;
  static override nicknames = [
    "listIsNotEmpty",
    "listNotEmpty",
    "notEmpty",
    "list_is_not_empty",
    "list_not_empty",
  ];
  static override symbol = "o";
  static override interactName = "listIsNotEmpty";
  static override operatorName = "notempty" as const;
  static override displayName = "Not Empty" as const;
  static override fullDisplayName = "List Not Empty" as const;
  static override tooltipInfo = "If the list is not empty" as const;

  static override kind = "list" as const;
  static override renderPattern = "PREFIX_1" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (list: iArray<IntegratedValue>): iBoolean => {
        return new iBoolean(list.size().gt(Integer.ZERO));
      },
    });
  }
}
