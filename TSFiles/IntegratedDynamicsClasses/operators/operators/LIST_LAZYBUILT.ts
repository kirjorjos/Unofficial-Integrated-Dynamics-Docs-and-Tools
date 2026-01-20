import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { iArrayLazy } from "IntegratedDynamicsClasses/typeWrappers/iArrayLazy";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { OPERATOR_GENERAL_IDENTITY } from "./GENERAL_IDENTITY";

export class OPERATOR_LIST_LAZYBUILT extends BaseOperator<
  IntegratedValue,
  Operator<
    Operator<IntegratedValue, IntegratedValue>,
    iArrayLazy<IntegratedValue>
  >
> {
    static override internalName = "integrateddynamics:list_lazybuilt"
  constructor() {
    super({
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
          const builderOutputNode = builder.getParsedSignature().getOutput();
          const initialNode = initial.getSignatureNode();
          if (!ParsedSignature.typeEquals(builderOutputNode, initialNode)) throw new Error(`Builder needs to have input and output type same as initial type.  Expected ${initialNode.type}, got input ${builder.getParsedSignature().getInput().type} and output ${builderOutputNode.type}`);
          return new iArrayLazy(
            initial,
            builder,
            new OPERATOR_GENERAL_IDENTITY()
          );
        };
      },
    });
  }
}
