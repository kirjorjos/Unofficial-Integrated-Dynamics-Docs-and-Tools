import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_BINARY_OR extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:binary_or",
      nicknames: ["binaryOr", "|", "integerBinaryOr"],
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
        globalMap
      ),
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
