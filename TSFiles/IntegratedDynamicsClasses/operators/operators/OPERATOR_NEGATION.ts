import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OPERATOR_NEGATION extends BaseOperator<
  Operator<IntegratedValue, iBoolean>,
  Operator<IntegratedValue, iBoolean>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:operator_negation",
      nicknames: ["operatorNegation", "negation"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Operator",
            obscured: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Boolean" },
            },
          },
          to: {
            type: "Operator",
            obscured: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Boolean" },
            },
          },
        },
        globalMap
      ),
      symbol: "!.",
      interactName: "operatorNegation",
      function: (
        predicate: Operator<IntegratedValue, iBoolean>
      ): TypeLambda<IntegratedValue, iBoolean> => {
        return (input: IntegratedValue): iBoolean => {
          return new iBoolean(!predicate.apply(input).valueOf());
        };
      },
    });
  }
}
