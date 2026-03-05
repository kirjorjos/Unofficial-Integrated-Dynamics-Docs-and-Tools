import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OPERATOR_DISJUNCTION extends BaseOperator<
  Operator<IntegratedValue, iBoolean>,
  Operator<
    Operator<IntegratedValue, iBoolean>,
    Operator<IntegratedValue, iBoolean>
  >
> {
  static override internalName =
    "integrateddynamics:operator_disjunction" as const;
  constructor() {
    super({
      nicknames: ["operatorDisjunction", "disjunction"],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: ".||.",
      interactName: "operatorDisjunction",
      function: (
        predicate1: Operator<IntegratedValue, iBoolean>
      ): TypeLambda<
        Operator<IntegratedValue, iBoolean>,
        TypeLambda<IntegratedValue, iBoolean>
      > => {
        return (
          predicate2: Operator<IntegratedValue, iBoolean>
        ): TypeLambda<IntegratedValue, iBoolean> => {
          return (input: IntegratedValue): iBoolean => {
            return new iBoolean(
              predicate1.apply(input).valueOf() ||
                predicate2.apply(input).valueOf()
            );
          };
        };
      },
    });
  }
}
