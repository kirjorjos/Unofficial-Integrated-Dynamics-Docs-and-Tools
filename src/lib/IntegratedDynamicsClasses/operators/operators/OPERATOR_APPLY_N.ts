import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_APPLY_N extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  Operator<iArray<IntegratedValue>, IntegratedValue>
> {
  static override internalName = "integrateddynamics:operator_apply_n" as const;
  static override numericID = 280;
  static override nicknames = [
    "operatorApply_n",
    "operatorApplyN",
    "applyn",
    "applyN",
    "apply_n",
  ];
  static override symbol = "apply_n";
  static override interactName = "operatorApply_n";
  static override operatorName = "apply_n" as const;
  static override displayName = "Apply N" as const;
  static override fullDisplayName = "Operator Apply N" as const;
  static override kind = "operator" as const;
  static override renderPattern = "INFIX" as const;
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
              to: { type: "Any", typeID: 2 },
            },
          },
          to: {
            type: "Function",
            from: {
              type: "List",
              listType: {
                type: "Any",
                typeID: 1,
              },
            },
            to: { type: "Any", typeID: 2 },
          },
        },
        normalizeSignature
      ),
      serializer: "integrateddynamics:curry",
      function: (
        op: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<iArray<IntegratedValue>, IntegratedValue> => {
        return (args: iArray<IntegratedValue>): IntegratedValue => {
          let result: IntegratedValue = op;
          for (const arg of args.valueOf()) {
            if (arg === undefined || arg === null) {
              throw new Error(
                "applyn requires all arguments to be defined and non-null."
              );
            }
            if (!(result instanceof Operator)) {
              throw new Error(`apply_n got too big a list`);
            }
            result = result.apply(arg);
          }
          return result;
        };
      },
    });
  }
}
