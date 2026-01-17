import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_STRING_LENGTH extends BaseOperator<iString, Integer> {
  constructor() {
    super({
      internalName: "integrateddynamics:string_length",
      nicknames: ["stringLength"],
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
        globalMap
      ),
      symbol: "len",
      interactName: "stringLength",
      function: (str: iString): Integer => {
        return new Integer(str.valueOf().length);
      },
    });
  }
}
