import { JavaMath } from "HelperClasses/Math";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_ARITHMETIC_MAXIMUM extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:arithmetic_maximum",
      nicknames: ["max", "arithmeticMaximum", "max", "numberMax"],
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
      symbol: "max",
      interactName: "numberMax",
      function: (
        num1: TypeNumber
      ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
        return (num2: TypeNumber): Promise<TypeNumber> => {
          return JavaMath.max(num1, num2);
        };
      },
    });
  }
}
