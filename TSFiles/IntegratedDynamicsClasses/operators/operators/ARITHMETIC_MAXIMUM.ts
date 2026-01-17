import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_ARITHMETIC_MAXIMUM extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  constructor() {
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          const [lowerOrder, higherOrder] =
            num1.getOrder() < num2.getOrder() ? [num1, num2] : [num2, num1];
          return higherOrder.max(lowerOrder);
        };
      },
    });
  }
}
