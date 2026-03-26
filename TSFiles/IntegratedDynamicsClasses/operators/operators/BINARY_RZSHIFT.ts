import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_BINARY_RZSHIFT extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  static override internalName = "integrateddynamics:binary_rzshift" as const;
  static override numericID = 11;
  static override nicknames = [
    "binaryRzshift",
    "integerUnsignedRightShift",
    "binaryUnsignedRightShift",
    "integerRzshift",
  ];
  static override symbol = ">>>";
  static override interactName = "integerUnsignedRightShift";
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
