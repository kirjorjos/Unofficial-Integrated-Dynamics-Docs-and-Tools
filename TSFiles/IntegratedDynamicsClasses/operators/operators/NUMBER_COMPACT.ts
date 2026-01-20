import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_NUMBER_COMPACT extends BaseOperator<TypeNumber, iString> {
    static override internalName = "integrateddynamics:number_compact"
  constructor() {
    super({
      nicknames: ["compact", "numberCompact"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "compact",
      interactName: "numberCompact",
      function: (number: TypeNumber): iString => {
        return new iString(number.compact());
      },
    });
  }
}
