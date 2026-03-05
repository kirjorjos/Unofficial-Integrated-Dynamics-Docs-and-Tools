import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Long } from "JavaNumberClasses/Long";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_LONG_TO_INTEGER extends BaseOperator<Long, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_integer" as const;
  constructor() {
    super({
      nicknames: ["longToInt", "longInteger", "longToInteger"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Long",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "()",
      interactName: "longLongToInteger",
      function: (long: Long): Integer => {
        return long.toInteger();
      },
    });
  }
}
