import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";

export class OPERATOR_OPERATOR_BY_NAME extends BaseOperator<
  iString,
  Operator<IntegratedValue, IntegratedValue>
> {
  static override internalName = "integrateddynamics:operator_by_name" as const;
  static override numericID = 146;
  static override nicknames = [
    "stringOperatorByName",
    "operatorByName",
    "opByName",
    "by_name",
    "operatorBy_name",
  ];
  static override symbol = "op_by_name";
  static override interactName = "stringOperatorByName";
  static override operatorName = "by_name" as const;
  static override displayName = "Operator By Name" as const;
  static override fullDisplayName = "Operator Operator By Name" as const;
  static override kind = "operator" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Operator",
            obscured: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 2 },
            },
          },
        },
        normalizeSignature
      ),
      function: (name: iString): Operator<IntegratedValue, IntegratedValue> => {
        const result = operatorRegistry.find(name.valueOf());
        if (!result) throw new Error(`No operator found: ${name.valueOf()}`);
        return result;
      },
    });
  }
}
