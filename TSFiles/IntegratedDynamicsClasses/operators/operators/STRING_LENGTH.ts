import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_STRING_LENGTH extends BaseOperator<iString, Integer> {
  static override internalName = "integrateddynamics:string_length" as const;
  static override numericID = 79;
  static override nicknames = ["stringLength"];
  static override symbol = "len";
  static override interactName = "stringLength";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (str: iString): Integer => {
        return new Integer(str.valueOf().length);
      },
    });
  }
}
