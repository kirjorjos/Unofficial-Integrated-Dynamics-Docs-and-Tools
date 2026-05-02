import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

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
  static override internalName = "integrateddynamics:operator_apply3" as const;
  static override numericID = 141;
  static override nicknames = [
    "apply3",
    "operatorApply3",
    "operator_apply3",
    "operatorApply_3",
  ];
  static override symbol = "apply3";
  static override interactName = "operatorApply3";
  static override operatorName = "apply3" as const;
  static override displayName = "Apply 3" as const;
  static override fullDisplayName = "Operator Apply 3" as const;
  static override tooltipInfo =
    "Apply for a given operator the given three value." as const;

  static override kind = "operator" as const;
  static override renderPattern = "INFIX_3" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
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
