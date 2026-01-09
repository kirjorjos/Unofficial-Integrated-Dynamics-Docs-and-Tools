import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { TypeMap } from "HelperClasses/TypeMap";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OPERATOR_CONJUNCTION extends BaseOperator<
  Operator<IntegratedValue, iBoolean>,
  Operator<
    Operator<IntegratedValue, iBoolean>,
    Operator<IntegratedValue, iBoolean>
  >
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:operator_conjunction",
      nicknames: ["operatorConjunction", "conjunction"],
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
        },
        globalMap
      ),
      symbol: ".&&.",
      interactName: "operatorConjunction",
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
              predicate1.apply(input).valueOf() &&
                predicate2.apply(input).valueOf()
            );
          };
        };
      },
    });
  }
}
