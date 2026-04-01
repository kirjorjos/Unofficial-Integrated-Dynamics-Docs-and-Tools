import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_ARITHMETIC_MODULUS extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  static override internalName =
    "integrateddynamics:arithmetic_modulus" as const;
  static override numericID = 81;
  static override nicknames = ["modulus", "arithmeticModulus", "numberModulus"];
  static override symbol = "%";
  static override interactName = "numberModulus";
  static override operatorName = "modulus" as const;
  static override kind = "arithmetic" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          if (num2.toJSNumber() === 0) {
            throw new Error("Modulus by zero");
          }
          if (num1.getOrder() < num2.getOrder()) {
            num1 = num1[`to${num2.getType()}`]();
          }
          return num1.mod(num2);
        };
      },
    });
  }
}
