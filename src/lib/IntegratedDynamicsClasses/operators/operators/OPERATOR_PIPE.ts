import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_OPERATOR_PIPE extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  Operator<
    Operator<IntegratedValue, IntegratedValue>,
    Operator<IntegratedValue, IntegratedValue>
  >
> {
  static override internalName = "integrateddynamics:operator_pipe" as const;
  static override numericID = 101;
  static override nicknames = ["operatorPipe", "pipe", "operator_pipe"];
  static override symbol = ".";
  static override interactName = "operatorPipe";
  static override operatorName = "pipe" as const;
  static override displayName = "Pipe" as const;
  static override fullDisplayName = "Operator Pipe" as const;
  static override tooltipInfo =
    "Create a new operator that pipes the output from the first operator to the second operator." as const;

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
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 2 },
                to: { type: "Any", typeID: 3 },
              },
            },
            to: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 3 },
              },
            },
          },
        },
        normalizeSignature
      ),
      serializer: "integrateddynamics:combined.pipe",
      function: (
        f: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<
        Operator<IntegratedValue, IntegratedValue>,
        Operator<IntegratedValue, IntegratedValue>
      > => {
        return (
          g: Operator<IntegratedValue, IntegratedValue>
        ): Operator<IntegratedValue, IntegratedValue> => {
          return f.pipe(g);
        };
      },
    });
  }

  override evaluate(...args: IntegratedValue[]) {
    if (args.length !== 2)
      throw new Error(`Pipe expected 2 args, got ${args.length}`);
    const [arg1, arg2] = args;
    if (!(arg1 instanceof Operator && arg2 instanceof Operator))
      throw new Error("Can't pipe a non-operator");
    return arg1.pipe(arg2);
  }
}
