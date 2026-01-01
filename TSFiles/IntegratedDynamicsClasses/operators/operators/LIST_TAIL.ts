import { TypeMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_TAIL extends BaseOperator<
  iArray<IntegratedValue>,
  iArray<IntegratedValue>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:list_tail",
      nicknames: ["listTail", "tail"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "List", listType: { type: "Any", typeID: 1 } },
        },
        globalMap
      ),
      symbol: "tail",
      interactName: "listTail",
      function: (list: iArray<IntegratedValue>): iArray<IntegratedValue> => {
        if (list.size().equals(new Integer(0))) {
          throw new Error("tail called on an empty list");
        }
        return list.slice(new Integer(1));
      },
    });
  }
}
