import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { iArrayLazy } from "IntegratedDynamicsClasses/typeWrappers/iArrayLazy";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { OPERATOR_GENERAL_IDENTITY } from "./GENERAL_IDENTITY";

export class OPERATOR_LIST_LAZYBUILT extends BaseOperator<
  IntegratedValue,
  Operator<
    Operator<IntegratedValue, IntegratedValue>,
    iArrayLazy<IntegratedValue>
  >
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:list_lazybuilt",
      nicknames: ["listLazybuilt", "lazybuilt", "anyLazyBuilt"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 1 },
              },
            },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        globalMap
      ),
      symbol: "lazybuilt",
      interactName: "anyLazyBuilt",
      function: (
        initial: IntegratedValue
      ): TypeLambda<
        Operator<IntegratedValue, IntegratedValue>,
        iArrayLazy<IntegratedValue>
      > => {
        return (
          builder: Operator<IntegratedValue, IntegratedValue>
        ): iArrayLazy<IntegratedValue> => {
          return new iArrayLazy(
            initial,
            builder,
            new OPERATOR_GENERAL_IDENTITY(globalMap)
          );
        };
      },
    });
  }
}
