import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { TypeMap } from "HelperClasses/TypeMap";

export class OPERATOR_OPERATOR_APPLY_0 extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  Operator<IntegratedValue, IntegratedValue>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:operator_apply0",
      nicknames: ["operatorApply_0", "apply0"],
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
            from: { type: "Any", typeID: 3 },
            to: { type: "Any", typeID: 2 },
          },
        },
        globalMap
      ),
      symbol: "apply0",
      interactName: "operatorApply0",
      serializer: "integrateddynamics:curry",
      function: (
        _op: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<undefined, IntegratedValue> => {
        return () => {
          throw new Error(`apply0 doesn't make sense to implement`);
        };
      },
    });
  }
}
