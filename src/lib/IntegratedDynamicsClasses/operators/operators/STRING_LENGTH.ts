import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_STRING_LENGTH extends BaseOperator<iString, Integer> {
  static override internalName = "integrateddynamics:string_length" as const;
  static override numericID = 79;
  static override nicknames = ["length", "stringLength", "string_length"];
  static override symbol = "len";
  static override interactName = "stringLength";
  static override operatorName = "length" as const;
  static override displayName = "Length" as const;
  static override fullDisplayName = "String Length" as const;
  static override tooltipInfo = "The length of the given String" as const;

  static override kind = "string" as const;
  static override renderPattern = "PREFIX_1" as const;
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
