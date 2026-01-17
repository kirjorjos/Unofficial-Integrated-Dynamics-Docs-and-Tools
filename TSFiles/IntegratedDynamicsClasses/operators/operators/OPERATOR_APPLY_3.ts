import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";

export class OPERATOR_OPERATOR_APPLY_3 extends BaseOperator<
  Operator<
    IntegratedValue,
    Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
  >,
  Operator<
    IntegratedValue,
    Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
  >
> {
  constructor() {
    super({
      internalName: "integrateddynamics:operator_apply3",
      nicknames: ["operatorApply_3", "apply3"],
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
                to: {
                  type: "Function",
                  from: { type: "Any", typeID: 3 },
                  to: { type: "Any", typeID: 4 },
                },
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
                type: "Function",
                from: {
                  type: "Any",
                  typeID: 3,
                },
                to: {
                  type: "Any",
                  typeID: 4,
                },
              },
            },
          },
        },
        globalMap
      ),
      symbol: "apply3",
      interactName: "operatorApply3",
      serializer: "integrateddynamics:curry",
      function: (
        op: Operator<
          IntegratedValue,
          Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
        >
      ): TypeLambda<
        IntegratedValue,
        TypeLambda<
          IntegratedValue,
          TypeLambda<IntegratedValue, IntegratedValue>
        >
      > => {
        return (
          arg1: IntegratedValue
        ): TypeLambda<
          IntegratedValue,
          TypeLambda<IntegratedValue, IntegratedValue>
        > => {
          return (
            arg2: IntegratedValue
          ): TypeLambda<IntegratedValue, IntegratedValue> => {
            return (arg3: IntegratedValue): IntegratedValue => {
              return op.apply(arg1).apply(arg2).apply(arg3);
            };
          };
        };
      },
    });
  }
}
