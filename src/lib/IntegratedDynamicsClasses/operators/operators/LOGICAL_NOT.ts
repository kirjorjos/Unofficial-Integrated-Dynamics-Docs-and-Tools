import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_LOGICAL_NOT extends BaseOperator<iBoolean, iBoolean> {
  static override internalName = "integrateddynamics:logical_not" as const;
  static override numericID = 69;
  static override nicknames = [
    "booleanNot",
    "logicalNot",
    "not",
    "boolean_not",
    "logical_not",
    "!",
  ];
  static override symbol = "!";
  static override interactName = "booleanNot";
  static override operatorName = "not" as const;
  static override displayName = "Not" as const;
  static override fullDisplayName = "Logical Not" as const;
  static override kind = "logical" as const;
  static override renderPattern = "PREFIX_1" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (bool: iBoolean): iBoolean => {
        return new iBoolean(!bool.valueOf());
      },
    });
  }
}
