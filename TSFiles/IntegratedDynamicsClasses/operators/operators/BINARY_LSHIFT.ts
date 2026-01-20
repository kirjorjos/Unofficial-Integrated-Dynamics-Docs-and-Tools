import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_BINARY_LSHIFT extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
    static override internalName = "integrateddynamics:binary_lshift"
  constructor() {
    super({
      nicknames: ["<<", "binaryLshift", "integerLeftShift"],
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
      symbol: "<<",
      interactName: "integerLeftShift",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.leftShift(int2);
        };
      },
    });
  }
}
