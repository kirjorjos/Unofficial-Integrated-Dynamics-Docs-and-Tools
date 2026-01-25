import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LOGICAL_NOT extends BaseOperator<iBoolean, iBoolean> {
  static override internalName = "integrateddynamics:logical_not" as const;
  constructor() {
    super({
      nicknames: ["not", "logicalNot"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Boolean",
        },
        to: {
          type: "Boolean",
        },
      }),
      symbol: "!",
      interactName: "booleanNot",
      function: (bool: iBoolean): iBoolean => {
        return new iBoolean(!bool.valueOf());
      },
    });
  }
}
