import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_OPERATOR_PIPE2 extends BaseOperator<any, any> {
  static override internalName = "integrateddynamics:operator_pipe2" as const;
  static override numericID = 177;
  static override nicknames = ["operatorPipe2", "pipe.2", "pipe2"];
  static override symbol = ".2";
  static override interactName = "operatorPipe2";
  static override operatorName = "pipe2" as const;
  static override kind = "operator" as const;
  static override renderPattern = "INFIX_2_LATE" as const;
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
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 3 },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 2 },
                  to: {
                    type: "Function",
                    from: { type: "Any", typeID: 3 },
                    to: { type: "Any", typeID: 4 },
                  },
                },
              },
              to: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Any", typeID: 4 },
                },
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
        TypeLambda<
          Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
          IntegratedValue
        >
      > => {
        return (
          g: Operator<IntegratedValue, IntegratedValue>
        ): TypeLambda<
          Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
          IntegratedValue
        > => {
          return (
            h: Operator<
              IntegratedValue,
              Operator<IntegratedValue, IntegratedValue>
            >
          ): IntegratedValue => {
            return f.pipe2(g, h);
          };
        };
      },
    });
  }

  override evaluate(...args: IntegratedValue[]) {
    if (args.length !== 3)
      throw new Error(`Pipe2 expected 3 args, got ${args.length}`);
    const [arg1, arg2, arg3] = args;
    if (
      !(
        arg1 instanceof Operator &&
        arg2 instanceof Operator &&
        arg3 instanceof Operator
      )
    )
      throw new Error("Can't pipe2 a non-operator");
    return arg1.pipe2(arg2, arg3);
  }
}
