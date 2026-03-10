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
  static override nicknames = ["uname", "uniquelynamedUniquename"];
  static override symbol = "uname";
  static override interactName = "uniquely_namedUniqueName";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "UniquelyNamed",
        },
        to: {
          type: "String",
        },
      }),
      function: (uniquelyNamed: UniquelyNamed): iString => {
        return uniquelyNamed.getUniqueName();
      },
    });
  }
}
