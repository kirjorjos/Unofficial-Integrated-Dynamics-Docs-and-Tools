import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_LIST_LENGTH extends BaseOperator<
  iArray<IntegratedValue>,
  Integer
> {
  static override internalName = "integrateddynamics:list_length" as const;
  constructor() {
    super({
      nicknames: ["listLength"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Integer",
        },
      }),
      symbol: "| |",
      interactName: "listLength",
      function: (list: iArray<IntegratedValue>): Integer => {
        return list.size();
      },
    });
  }
}
