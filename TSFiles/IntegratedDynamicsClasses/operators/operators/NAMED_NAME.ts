import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NAMED_NAME extends BaseOperator<
  IntegratedValue,
  iString
> {
  constructor() {
    super({
      internalName: "integrateddynamics:string_name",
      nicknames: ["name", "namedName", "toString"],
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
        globalMap
      ),
      symbol: "name",
      interactName: "namedName",
      function: (named: TypeRawSignatureAST.RawSignatureNamed): iString => {
        return new iString(named.toString());
      },
    });
  }
}
