import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_BINARY_OR extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  static override internalName = "integrateddynamics:binary_or" as const;
  static override numericID = 9;
  static override nicknames = ["binaryOr", "integerBinaryOr", "or"];
  static override symbol = "|";
  static override interactName = "integerBinaryOr";
  static override operatorName = "or" as const;
  static override displayName = "Or" as const;
  static override fullDisplayName = "Binary Or" as const;
  static override kind = "binary" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Integer",
            },
          },
        },
        normalizeSignature
      ),
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.binaryOr(int2);
        };
      },
    });
  }
}
