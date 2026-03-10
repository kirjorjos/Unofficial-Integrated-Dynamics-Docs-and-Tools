import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_APPLY_N extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  Operator<iArray<IntegratedValue>, IntegratedValue>
> {
  static override internalName = "integrateddynamics:operator_apply_n" as const;
  static override nicknames = ["operatorApplyN", "applyn", "applyN"];
  static override symbol = "apply_n";
  static override interactName = "operatorApply_n";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
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
