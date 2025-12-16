import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_GENERAL_IDENTITY extends BaseOperator<
  IntegratedValue,
  IntegratedValue
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:general_identity",
      nicknames: ["generalIdentity", "id", "identity", "anyIdentity"],
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
        globalMap
      ),
      symbol: "id",
      interactName: "anyIdentity",
      function: (value: IntegratedValue): IntegratedValue => {
        return value;
      },
    });
  }
}
