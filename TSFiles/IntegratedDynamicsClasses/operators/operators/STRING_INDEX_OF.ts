import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";

export class OPERATOR_STRING_INDEX_OF extends BaseOperator<
  iString,
  Operator<iString, Integer>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:string_index_of",
      nicknames: ["stringIndexOf"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "index_of",
      interactName: "stringIndexOf",
      function: (substring: iString): TypeLambda<iString, Integer> => {
        return (fullString: iString): Integer => {
          return new Integer(fullString.valueOf().indexOf(substring.valueOf()));
        };
      },
    });
  }
}
