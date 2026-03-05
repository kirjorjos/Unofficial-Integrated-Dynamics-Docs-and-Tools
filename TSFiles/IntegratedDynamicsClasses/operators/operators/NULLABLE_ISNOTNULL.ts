import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iNull } from "IntegratedDynamicsClasses/typeWrappers/iNull";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_NULLABLE_ISNOTNULL extends BaseOperator<
  IntegratedValue,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:general_isnotnull" as const;
  constructor() {
    super({
      nicknames: ["isNotNull", "nullableIsnotnull"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Boolean",
        },
      }),
      symbol: "∅",
      interactName: "anyIsNotNull",
      function: (value: IntegratedValue): iBoolean => {
        return new iBoolean(!(value instanceof iNull));
      },
    });
  }
}
