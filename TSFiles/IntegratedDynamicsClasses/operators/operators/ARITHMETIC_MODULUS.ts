import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_ARITHMETIC_MODULUS extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:arithmetic_modulus",
      nicknames: ["modulus", "arithmeticModulus", "%", "numberModulus"],
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
      symbol: "%",
      interactName: "numberModulus",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          if (num2.toJSNumber() === 0) {
            throw new Error("Modulus by zero");
          }
          if (num1.getOrder() < num2.getOrder()) {
            num1 = num1[`to${num2.getSignatureNode().type}`]() as TypeNumber;
          }
          return num1.mod(num2);
        };
      },
    });
  }
}
