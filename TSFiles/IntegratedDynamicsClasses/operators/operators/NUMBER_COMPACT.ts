import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NUMBER_COMPACT extends BaseOperator<TypeNumber, iString> {
  static override internalName = "integrateddynamics:number_compact" as const;
  static override nicknames = ["compact", "numberCompact"];
  static override symbol = "compact";
  static override interactName = "numberCompact";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (number: TypeNumber): iString => {
        return new iString(number.compact());
      },
    });
  }
}
