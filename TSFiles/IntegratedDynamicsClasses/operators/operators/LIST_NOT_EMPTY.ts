import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_NOT_EMPTY extends BaseOperator<
  iArray<IntegratedValue>,
  iBoolean
> {
  static override internalName = "integrateddynamics:list_notempty" as const;
  static override numericID = 106;
  static override nicknames = ["listNotEmpty", "listIsNotEmpty"];
  static override symbol = "o";
  static override interactName = "listIsNotEmpty";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (list: iArray<IntegratedValue>): iBoolean => {
        return new iBoolean(list.size().gt(Integer.ZERO));
      },
    });
  }
}
