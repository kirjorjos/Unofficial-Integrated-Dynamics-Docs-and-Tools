import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_DOUBLE_POW extends BaseOperator<
  Double,
  Operator<Double, Double>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:double_pow",
      nicknames: ["doublePow", "pow"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "Function",
            from: {
              type: "Double",
            },
            to: {
              type: "Double",
            },
          },
        },
        globalMap
      ),
      symbol: "pow",
      interactName: "doublePow",
      function: (base: Double): TypeLambda<Double, Double> => {
        return (exponent: Double): Double => {
          return base.pow(exponent);
        };
      },
    });
  }
}
