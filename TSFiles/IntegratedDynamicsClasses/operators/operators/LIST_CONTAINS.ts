import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_CONTAINS extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, iBoolean>
> {
  static override internalName = "integrateddynamics:list_contains" as const;
  static override nicknames = ["listContains", "contains"];
  static override symbol = "contains";
  static override interactName = "listContains";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
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
