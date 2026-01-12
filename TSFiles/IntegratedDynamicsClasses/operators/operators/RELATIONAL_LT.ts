import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";

export class OPERATOR_RELATIONAL_LT extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, iBoolean>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:relational_lt",
      nicknames: ["relationalLt", "<"],
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
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "<",
      interactName: "numberLessThan",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, iBoolean> => {
        return (num2: TypeNumber): iBoolean => {
          return new iBoolean(num1.lt(num2));
        };
      },
    });
  }
}
