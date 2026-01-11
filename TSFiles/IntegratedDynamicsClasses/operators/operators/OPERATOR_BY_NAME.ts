import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { TypeMap } from "HelperClasses/TypeMap";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { operatorRegistry } from "../operatorRegistry";

export class OPERATOR_OPERATOR_BY_NAME extends BaseOperator<
  iString,
  Operator<IntegratedValue, IntegratedValue>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:operator_by_name",
      nicknames: ["operatorByName", "opByName"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 2 },
          },
        },
        globalMap
      ),
      symbol: "op_by_name",
      interactName: "stringOperatorByName",
      function: (name: iString): Operator<IntegratedValue, IntegratedValue> => {
        const result = operatorRegistry.find(name.valueOf());
        if (!result) throw new Error(`No operator found: ${name.valueOf()}`);
        return result;
      },
    });
  }
}
