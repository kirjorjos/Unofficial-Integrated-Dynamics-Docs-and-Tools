import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_LIST_LENGTH extends BaseOperator<
  iArray<IntegratedValue>,
  Integer
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:list_length",
      nicknames: ["listLength"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "| |",
      interactName: "listLength",
      function: (list: iArray<IntegratedValue>): Integer => {
        return list.size();
      },
    });
  }
}
