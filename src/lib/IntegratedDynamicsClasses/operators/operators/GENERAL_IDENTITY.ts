import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_GENERAL_IDENTITY extends BaseOperator<
  IntegratedValue,
  IntegratedValue
> {
  static override internalName = "integrateddynamics:general_identity" as const;
  static override numericID = 45;
  static override nicknames = [
    "generalIdentity",
    "id",
    "identity",
    "anyIdentity",
  ];
  static override symbol = "id";
  static override interactName = "anyIdentity";
  static override operatorName = "identity" as const;
  static override kind = "general" as const;
  static override renderPattern = "PREFIX_1" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Any",
            typeID: 1,
          },
        },
        normalizeSignature
      ),
      function: (value: IntegratedValue): IntegratedValue => {
        return value;
      },
    });
  }
}
