import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_BINARY_AND extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:binary_and",
      nicknames: ["binaryAnd", "&", "integerBinaryAnd"],
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
      symbol: "&",
      interactName: "integerBinaryAnd",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.binaryAnd(int2);
        };
      },
    });
  }
}
