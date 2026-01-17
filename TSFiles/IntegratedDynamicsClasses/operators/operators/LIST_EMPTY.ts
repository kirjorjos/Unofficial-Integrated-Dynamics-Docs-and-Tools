import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_LIST_EMPTY extends BaseOperator<
  iArray<IntegratedValue>,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:list_empty",
      nicknames: ["listEmpty", "listIsEmpty"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "∅",
      interactName: "listIsEmpty",
      function: (list: iArray<IntegratedValue>): iBoolean => {
        return list.size().equals(Integer.ZERO);
      },
    });
  }
}
