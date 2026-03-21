import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_GENERAL_IDENTITY extends BaseOperator<
  IntegratedValue,
  IntegratedValue
> {
  static override internalName = "integrateddynamics:general_identity" as const;
  static override nicknames = [
    "generalIdentity",
    "id",
    "identity",
    "anyIdentity",
  ];
  static override symbol = "id";
  static override interactName = "anyIdentity";
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
