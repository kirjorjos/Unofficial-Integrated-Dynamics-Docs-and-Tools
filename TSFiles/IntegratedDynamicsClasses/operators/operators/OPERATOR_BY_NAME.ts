import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";

export class OPERATOR_OPERATOR_BY_NAME extends BaseOperator<
  iString,
  Operator<IntegratedValue, IntegratedValue>
> {
  static override internalName = "integrateddynamics:operator_by_name" as const;
  static override nicknames = [
    "stringOperatorByName",
    "operatorByName",
    "opByName",
  ];
  static override symbol = "op_by_name";
  static override interactName = "stringOperatorByName";
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
