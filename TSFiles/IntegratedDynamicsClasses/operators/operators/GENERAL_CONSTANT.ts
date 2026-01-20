import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_GENERAL_CONSTANT extends BaseOperator<
  IntegratedValue,
  Operator<IntegratedValue, IntegratedValue>
> {
    static override internalName = "integrateddynamics:general_constant"
  constructor() {
    super({
      nicknames: ["generalConstant", "const", "constant", "anyConstant", "K"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 2,
            },
            to: {
              type: "Any",
              typeID: 1,
            },
          },
        },
        globalMap
      ),
      symbol: "K",
      interactName: "anyConstant",
      function: (value: IntegratedValue): TypeLambda<void, IntegratedValue> => {
        return () => {
          return value;
        };
      },
    });
  }
}
