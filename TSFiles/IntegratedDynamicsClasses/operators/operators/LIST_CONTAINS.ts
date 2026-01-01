import { TypeMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_CONTAINS extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, iBoolean>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:list_contains",
      nicknames: ["listContains", "contains"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "contains",
      interactName: "listContains",
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<IntegratedValue, iBoolean> => {
        return (element: IntegratedValue): iBoolean => {
          return list.includes(element);
        };
      },
    });
  }
}
