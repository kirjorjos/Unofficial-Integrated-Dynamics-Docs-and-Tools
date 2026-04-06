import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_BINARY_AND extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  static override internalName = "integrateddynamics:binary_and" as const;
  static override numericID = 6;
  static override nicknames = ["binaryAnd", "integerBinaryAnd", "and"];
  static override symbol = "&";
  static override interactName = "integerBinaryAnd";
  static override operatorName = "and" as const;
  static override displayName = "And" as const;
  static override fullDisplayName = "Binary And" as const;
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
          return int1.binaryAnd(int2);
        };
      },
    });
  }
}
