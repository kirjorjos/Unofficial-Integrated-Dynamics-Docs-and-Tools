import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_LIST_HEAD extends BaseOperator<
  iArray<IntegratedValue>,
  IntegratedValue
> {
  constructor() {
    super({
      internalName: "integrateddynamics:list_head",
      nicknames: ["listHead", "head"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "Any", typeID: 1 },
        },
        globalMap
      ),
      symbol: "head",
      interactName: "listHead",
      function: (list: iArray<IntegratedValue>): IntegratedValue => {
        if (list.size().equals(Integer.ZERO)) {
          throw new Error("head called on an empty list");
        }
        return list.get(Integer.ZERO);
      },
    });
  }
}
