import { TypeMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_NOT_EMPTY extends BaseOperator<
  iArray<IntegratedValue>,
  iBoolean
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:list_notempty",
      nicknames: ["listNotEmpty", "listIsNotEmpty"],
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
      symbol: "o",
      interactName: "listIsNotEmpty",
      function: (list: iArray<IntegratedValue>): iBoolean => {
        return new iBoolean(list.size().gte(Integer.ZERO));
      },
    });
  }
}
