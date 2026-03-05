import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_BINARY_XOR extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  static override internalName = "integrateddynamics:binary_xor" as const;
  constructor() {
    super({
      nicknames: ["binaryXor", "^", "integerXor"],
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
      symbol: "^",
      interactName: "integerXor",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.binaryXor(int2);
        };
      },
    });
  }
}
