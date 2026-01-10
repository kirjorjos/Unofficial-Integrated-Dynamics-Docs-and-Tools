import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";
import { JavaMath } from "HelperClasses/Math";

export class OPERATOR_RELATIONAL_LE extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, iBoolean>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:relational_le",
      nicknames: ["relationalLe", "<="],
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
      symbol: "<=",
      interactName: "anyLessThanOrEquals",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, iBoolean> => {
        return (num2: TypeNumber): iBoolean => {
          return new iBoolean(JavaMath.lte(num1, num2));
        };
      },
    });
  }
}
