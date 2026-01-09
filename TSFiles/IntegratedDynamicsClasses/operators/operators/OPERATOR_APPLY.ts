import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { TypeMap } from "HelperClasses/TypeMap";

export class OPERATOR_OPERATOR_APPLY extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  Operator<IntegratedValue, IntegratedValue>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:operator_apply",
      nicknames: ["operatorApply", "apply"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Operator",
            obscured: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 2 },
            },
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 2 },
          },
        },
        globalMap
      ),
      symbol: "apply",
      interactName: "operatorApply",
      serializer: "integrateddynamics:curry",
      function: (
        op: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<IntegratedValue, IntegratedValue> => {
        return (arg: IntegratedValue): IntegratedValue => {
          return op.apply(arg);
        };
      },
    });
  }
}
