import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_APPLY_N extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  Operator<iArray<IntegratedValue>, IntegratedValue>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:operator_apply_n",
      nicknames: ["operatorApplyN", "applyn", "applyN"],
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
        globalMap
      ),
      symbol: "apply_n",
      interactName: "operatorApply_n",
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
