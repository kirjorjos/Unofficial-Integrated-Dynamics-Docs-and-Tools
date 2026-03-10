import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_OPERATOR_APPLY_2 extends BaseOperator<
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
> {
  static override internalName = "integrateddynamics:operator_apply2" as const;
  static override nicknames = ["operatorApply2", "operatorApply_2", "apply2"];
  static override symbol = "apply2";
  static override interactName = "operatorApply2";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
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
