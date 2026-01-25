import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_STRING_LENGTH extends BaseOperator<iString, Integer> {
  static override internalName = "integrateddynamics:string_length" as const;
  constructor() {
    super({
      nicknames: ["stringLength"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "len",
      interactName: "stringLength",
      function: (str: iString): Integer => {
        return new Integer(str.valueOf().length);
      },
    });
  }
}
