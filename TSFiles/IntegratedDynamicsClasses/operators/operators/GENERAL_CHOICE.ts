import { globalMap } from "HelperClasses/TypeMap";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";

export class OPERATOR_GENERAL_CHOICE extends BaseOperator<
  iBoolean,
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:general_choice",
      nicknames: [
        "generalChoice",
        "choice",
        "booleanChoice",
        "?",
        "if",
        "ifElse",
        "if_else",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1,
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 1,
              },
              to: {
                type: "Any",
                typeID: 1,
              },
            },
          },
        },
        globalMap
      ),
      symbol: "?",
      interactName: "booleanChoice",
      function: <T>(bool: iBoolean): TypeLambda<T, TypeLambda<T, T>> => {
        return (trueValue: T): TypeLambda<T, T> => {
          return (falseValue: T): T => {
            return bool ? trueValue : falseValue;
          };
        };
      },
    });
  }
}
