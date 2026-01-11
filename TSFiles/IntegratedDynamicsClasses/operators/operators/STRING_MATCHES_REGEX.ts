import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";
import RE2 from "re2";

export class OPERATOR_STRING_MATCHES_REGEX extends BaseOperator<
  iString,
  Operator<iString, iBoolean>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_matches_regex",
      nicknames: ["matchesRegex"],
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
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "matches_regex",
      interactName: "stringMatchesRegex",
      function: (regexString: iString): TypeLambda<iString, iBoolean> => {
        return (fullString: iString): iBoolean => {
          let regex = regexString.valueOf();
          if (regex.startsWith("^")) regex = regex.slice(1);
          if (regex.endsWith("$")) regex = regex.slice(0, -1);
          const re2 = new RE2(`^(?:${regex})$`, "u");
          return new iBoolean(re2.test(fullString.valueOf()));
        };
      },
    });
  }
}
