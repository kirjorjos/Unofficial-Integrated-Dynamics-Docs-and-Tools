import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { TypeMap } from "HelperClasses/TypeMap";

export class OPERATOR_OPERATOR_APPLY_2 extends BaseOperator<
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:operator_apply2",
      nicknames: ["operatorApply_2", "apply2"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Operator",
            obscured: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Function",
                from: { type: "Any", typeID: 2 },
                to: { type: "Any", typeID: 3 },
              },
            },
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1,
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 2,
              },
              to: {
                type: "Any",
                typeID: 3,
              },
            },
          },
        },
        globalMap
      ),
      symbol: "apply2",
      interactName: "operatorApply2",
      serializer: "integrateddynamics:curry",
      function: (
        op: Operator<
          IntegratedValue,
          Operator<IntegratedValue, IntegratedValue>
        >
      ): TypeLambda<
        IntegratedValue,
        TypeLambda<IntegratedValue, IntegratedValue>
      > => {
        return (
          arg1: IntegratedValue
        ): TypeLambda<IntegratedValue, IntegratedValue> => {
          return (arg2: IntegratedValue): IntegratedValue => {
            return op.apply(arg1).apply(arg2);
          };
        };
      },
    });
  }
}
