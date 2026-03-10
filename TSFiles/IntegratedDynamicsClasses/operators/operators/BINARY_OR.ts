import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_BINARY_OR extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  static override internalName = "integrateddynamics:binary_or" as const;
  constructor() {
    super({
      nicknames: ["binaryOr", "integerBinaryOr"],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "|",
      interactName: "integerBinaryOr",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.binaryOr(int2);
        };
      },
    });
  }
}
