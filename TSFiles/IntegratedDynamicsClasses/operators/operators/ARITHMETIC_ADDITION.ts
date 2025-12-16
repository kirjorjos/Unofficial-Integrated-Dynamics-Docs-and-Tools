import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { TypeMap } from "HelperClasses/TypeMap";
import { JavaMath } from "HelperClasses/Math";

export class OPERATOR_ARITHMETIC_ADDITION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:arithmetic_addition",
      nicknames: ["add", "arithmeticAddition", "+", "numberAdd"],
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
      symbol: "+",
      interactName: "numberAdd",
      function: async (
        num1: TypeNumber
      ): Promise<TypeLambda<TypeNumber, Promise<TypeNumber>>> => {
        return async (num2: TypeNumber): Promise<TypeNumber> => {
          return JavaMath.add(num1, num2);
        };
      },
    });
  }
}
