import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_OPERATOR_PIPE extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  Operator<
    Operator<IntegratedValue, IntegratedValue>,
    Operator<IntegratedValue, IntegratedValue>
  >
> {
  static override internalName = "integrateddynamics:operator_pipe" as const;
  static override nicknames = ["operatorPipe", "pipe"];
  static override symbol = ".";
  static override interactName = "operatorPipe";
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
      }),
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
