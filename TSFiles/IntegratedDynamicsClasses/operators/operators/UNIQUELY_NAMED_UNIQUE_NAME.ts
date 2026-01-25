import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { UniquelyNamed } from "IntegratedDynamicsClasses/UniquelyNamed";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_UNIQUELY_NAMED_UNIQUE_NAME extends BaseOperator<
  IntegratedValue,
  iString
> {
  static override internalName =
    "integrateddynamics:string_unique_name" as const;
  constructor() {
    super({
      nicknames: ["uname", "uniquelynamedUniquename"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "UniquelyNamed",
        },
        to: {
          type: "String",
        },
      }),
      symbol: "uname",
      interactName: "uniquely_namedUniqueName",
      function: (uniquelyNamed: UniquelyNamed): iString => {
        return uniquelyNamed.getUniqueName();
      },
    });
  }
}
