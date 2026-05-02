import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_BINARY_RZSHIFT extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  static override internalName = "integrateddynamics:binary_rzshift" as const;
  static override numericID = 11;
  static override nicknames = [
    "binaryRzshift",
    "binaryUnsignedRightShift",
    "integerRzshift",
    "integerUnsignedRightShift",
    "rzshift",
    "binary_rzshift",
    "binary_unsigned_right_shift",
    "integer_rzshift",
    "integer_unsigned_right_shift",
    "unsignedRightShift",
    "unsigned_right_shift",
    ">>>",
  ];
  static override symbol = ">>>";
  static override interactName = "integerUnsignedRightShift";
  static override operatorName = "rzshift" as const;
  static override displayName = "Right Zero Shift" as const;
  static override fullDisplayName = "Binary Right Zero Shift" as const;
  static override tooltipInfo = "Right Shift with zeros fill" as const;

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
          return new Integer(int1.unsignedRightShift(int2));
        };
      },
    });
  }
}
