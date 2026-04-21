import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_GENERAL_IDENTITY extends BaseOperator<
  IntegratedValue,
  IntegratedValue
> {
  static override internalName = "integrateddynamics:general_identity" as const;
  static override numericID = 45;
  static override nicknames = [
    "anyIdentity",
    "generalIdentity",
    "id",
    "identity",
    "any_identity",
    "general_identity",
  ];
  static override symbol = "id";
  static override interactName = "anyIdentity";
  static override operatorName = "identity" as const;
  static override displayName = "Identity" as const;
  static override fullDisplayName = "General Identity" as const;
  static override tooltipInfo = "A copy of the input value." as const;

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
