import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_GENERAL_IDENTITY extends BaseOperator<
  IntegratedValue,
  IntegratedValue
> {
  static override internalName = "integrateddynamics:general_identity" as const;
  constructor() {
    super({
      nicknames: ["generalIdentity", "id", "identity", "anyIdentity"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Any",
          typeID: 1,
        },
        to: {
          type: "Any",
          typeID: 1,
        },
      }),
      symbol: "id",
      interactName: "anyIdentity",
      function: (value: IntegratedValue): IntegratedValue => {
        return value;
      },
    });
  }
}
