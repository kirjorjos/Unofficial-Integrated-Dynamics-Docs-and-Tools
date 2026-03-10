import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_TAIL extends BaseOperator<
  iArray<IntegratedValue>,
  iArray<IntegratedValue>
> {
  static override internalName = "integrateddynamics:list_tail" as const;
  static override nicknames = ["listTail", "tail"];
  static override symbol = "tail";
  static override interactName = "listTail";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: { type: "List", listType: { type: "Any", typeID: 1 } },
      }),
      function: (list: iArray<IntegratedValue>): iArray<IntegratedValue> => {
        if (list.size().equals(Integer.ZERO).valueOf()) {
          throw new Error("tail called on an empty list");
        }
        return list.slice(Integer.ONE);
      },
    });
  }
}
