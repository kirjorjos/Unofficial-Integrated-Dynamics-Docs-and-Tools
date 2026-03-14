import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";

export class OPERATOR_LOGICAL_OR extends BaseOperator<
  iBoolean,
  Operator<iBoolean, iBoolean>
> {
  static override internalName = "integrateddynamics:logical_or" as const;
  static override nicknames = ["booleanOr", "or", "logicalOr", "||"];
  static override symbol = "||";

  static override interactName = "booleanOr";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Boolean",
        },
        to: {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Boolean",
          },
        },
      }),
      function: (bool1: iBoolean): TypeLambda<iBoolean, iBoolean> => {
        return (bool2: iBoolean): iBoolean => {
          return new iBoolean(bool1.valueOf() || bool2.valueOf());
        };
      },
    });
  }
}
