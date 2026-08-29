import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

export class OPERATOR_OPERATOR_BY_NAME extends BaseOperator<
  iString,
  Operator<IntegratedValue, IntegratedValue>
> {
  static override internalName = "integrateddynamics:operator_by_name" as const;
  static override numericID = 146;
  static override nicknames = [
    "byName",
    "opByName",
    "operatorByName",
    "stringOperatorByName",
    "by_name",
    "op_by_name",
    "operator_by_name",
    "operatorBy_name",
    "string_operator_by_name",
  ];
  static override symbol = "op_by_name";
  static override interactName = "stringOperatorByName";
  static override operatorName = "by_name" as const;
  static override displayName = "Operator By Name" as const;
  static override fullDisplayName = "Operator Operator By Name" as const;
  static override stringDisplayNames = [
    "operator by name",
    "operator by Name",
    "operator By name",
    "operator By Name",
    "Operator by name",
    "Operator by Name",
    "Operator By name",
    "Operator By Name",
    "operator operator by name",
    "operator operator by Name",
    "operator operator By name",
    "operator operator By Name",
    "operator Operator by name",
    "operator Operator by Name",
    "operator Operator By name",
    "operator Operator By Name",
    "Operator operator by name",
    "Operator operator by Name",
    "Operator operator By name",
    "Operator operator By Name",
    "Operator Operator by name",
    "Operator Operator by Name",
    "Operator Operator By name",
    "Operator Operator By Name",
  ];
  static override tooltipInfo =
    "Get the operator that has the given unique name." as const;

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
        if (!result) throw new iError(`No operator found: ${name.valueOf()}`);
        return result;
      },
    });
  }
}
