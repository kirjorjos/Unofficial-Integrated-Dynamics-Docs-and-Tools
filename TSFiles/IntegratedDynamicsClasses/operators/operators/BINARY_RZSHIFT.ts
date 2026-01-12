import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_BINARY_RZSHIFT extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:binary_rzshift",
      nicknames: [
        ">>>",
        "binaryRzshift",
        "integerUnsignedRightShift",
        "binaryUnsignedRightShift",
        "integerRzshift",
      ],
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
      symbol: ">>>",
      interactName: "integerUnsignedRightShift",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return new Integer(int1.unsignedRightShift(int2));
        };
      },
    });
  }
}
