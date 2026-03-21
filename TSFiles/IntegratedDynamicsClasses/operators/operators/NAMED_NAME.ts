import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NAMED_NAME extends BaseOperator<
  IntegratedValue,
  iString
> {
  static override internalName = "integrateddynamics:string_name" as const;
  static override nicknames = ["name", "namedName", "toString"];
  static override symbol = "name";
  static override interactName = "namedName";
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
