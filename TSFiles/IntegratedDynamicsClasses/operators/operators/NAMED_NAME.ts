import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NAMED_NAME extends BaseOperator<
  IntegratedValue,
  iString
> {
  static override internalName = "integrateddynamics:string_name" as const;
  constructor() {
    super({
      nicknames: ["name", "namedName", "toString"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Named",
        },
        to: {
          type: "String",
        },
      }),
      symbol: "name",
      interactName: "namedName",
      function: (named: TypeRawSignatureAST.RawSignatureNamed): iString => {
        return new iString(named.toString());
      },
    });
  }
}
