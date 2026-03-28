import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NUMBER_COMPACT extends BaseOperator<TypeNumber, iString> {
  static override internalName = "integrateddynamics:number_compact" as const;
  static override numericID = 277;
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
