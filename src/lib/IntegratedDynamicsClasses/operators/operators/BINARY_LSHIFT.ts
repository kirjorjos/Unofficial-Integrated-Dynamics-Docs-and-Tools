import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_BINARY_LSHIFT extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  static override internalName = "integrateddynamics:binary_lshift" as const;
  static override numericID = 8;
  static override nicknames = [
    "binaryLshift",
    "integerLeftShift",
    "lshift",
    "binary_lshift",
    "integer_left_shift",
    "leftShift",
    "left_shift",
    "<<",
  ];
  static override symbol = "<<";
  static override interactName = "integerLeftShift";
  static override operatorName = "lshift" as const;
  static override displayName = "Left Shift" as const;
  static override fullDisplayName = "Binary Left Shift" as const;
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
          return int1.leftShift(int2);
        };
      },
    });
  }
}
