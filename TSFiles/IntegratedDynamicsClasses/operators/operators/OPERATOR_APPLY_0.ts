import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_OPERATOR_APPLY_0 extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  IntegratedValue
> {
  static override internalName = "integrateddynamics:operator_apply0" as const;
  static override numericID = 279;
  static override nicknames = ["operatorApply0", "operatorApply_0", "apply0"];
  static override symbol = "apply0";
  static override interactName = "operatorApply0";
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
            type: "Any",
            typeID: 2,
          },
        },
        normalizeSignature
      ),
      serializer: "integrateddynamics:curry",
      function: (
        op: Operator<IntegratedValue, IntegratedValue>
      ): IntegratedValue => {
        return new Operator<IntegratedValue, IntegratedValue>({
          function:
            op.getParsedSignature().getArity() > 0 ? op.getFn() : op.getFn()(),
          parsedSignature: op.getParsedSignature(),
        });
      },
    });
  }

  override evaluate(...args: IntegratedValue[]): IntegratedValue {
    if (args.length !== 1)
      throw new Error(`Operator expected 1 arg, got ${args.length}`);
    const op = args[0] as Operator<IntegratedValue, IntegratedValue>;
    if (op.getParsedSignature().getArity() === 0) return op.getFn()();
    return new Operator<IntegratedValue, IntegratedValue>({
      function: op.getFn(),
      parsedSignature: op.getParsedSignature(),
    });
  }
}
