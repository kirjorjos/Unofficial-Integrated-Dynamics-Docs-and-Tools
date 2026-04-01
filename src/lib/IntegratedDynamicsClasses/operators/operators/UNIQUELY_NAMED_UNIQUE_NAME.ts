import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { UniquelyNamed } from "lib/IntegratedDynamicsClasses/UniquelyNamed";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_UNIQUELY_NAMED_UNIQUE_NAME extends BaseOperator<
  IntegratedValue,
  iString
> {
  static override internalName =
    "integrateddynamics:string_unique_name" as const;
  static override numericID = 147;
  static override nicknames = [
    "uniquely_namedUniqueName",
    "uname",
    "uniquelynamedUniquename",
    "unique_name",
    "stringUnique_name",
  ];
  static override symbol = "uname";
  static override interactName = "uniquely_namedUniqueName";
  static override operatorName = "unique_name" as const;
  static override kind = "string" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "UniquelyNamed",
          },
          to: {
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (uniquelyNamed: UniquelyNamed): iString => {
        return uniquelyNamed.getUniqueName();
      },
    });
  }
}
