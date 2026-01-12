import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_ARITHMETIC_SUBTRACTION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:arithmetic_subtraction",
      nicknames: ["subtract", "arithmeticSubtraction"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
        },
        globalMap
      ),
      symbol: "-",
      interactName: "numberSubtract",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          return num1.subtract(num2);
        };
      },
    });
  }
}
