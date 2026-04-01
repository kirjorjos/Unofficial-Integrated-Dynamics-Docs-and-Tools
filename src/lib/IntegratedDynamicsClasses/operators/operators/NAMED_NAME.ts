import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NAMED_NAME extends BaseOperator<
  IntegratedValue,
  iString
> {
  static override internalName = "integrateddynamics:string_name" as const;
  static override numericID = 80;
  static override nicknames = ["name", "namedName", "toString", "stringName"];
  static override symbol = "name";
  static override interactName = "namedName";
  static override operatorName = "name" as const;
  static override kind = "string" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Named",
          },
          to: {
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (named: TypeRawSignatureAST.RawSignatureNamed): iString => {
        return new iString(named.toString());
      },
    });
  }
}
