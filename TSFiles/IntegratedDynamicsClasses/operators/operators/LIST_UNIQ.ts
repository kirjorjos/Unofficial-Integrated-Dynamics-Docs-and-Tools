import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_LIST_UNIQ extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, iArray<IntegratedValue>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:list_uniq",
      nicknames: ["listUniq"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "List", listType: { type: "Any", typeID: 1 } },
        },
        globalMap
      ),
      symbol: "uniq",
      interactName: "listUnique",
      function: (list: iArray<IntegratedValue>): iArray<IntegratedValue> => {
        const seen = new Set();
        return list.filter((item) => {
          if (seen.has(item)) {
            return false;
          } else {
            seen.add(item);
            return true;
          }
        });
      },
    });
  }
}
