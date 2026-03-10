import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LOGICAL_NOT extends BaseOperator<iBoolean, iBoolean> {
  static override internalName = "integrateddynamics:logical_not" as const;
  static override nicknames = ["booleanNot", "not", "logicalNot"];
  static override symbol = "!";
  static override interactName = "booleanNot";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Boolean",
        },
        to: {
          type: "Boolean",
        },
      }),
      function: (bool: iBoolean): iBoolean => {
        return new iBoolean(!bool.valueOf());
      },
    });
  }
}
