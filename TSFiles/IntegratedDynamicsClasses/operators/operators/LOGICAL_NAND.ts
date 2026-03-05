import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";

export class OPERATOR_LOGICAL_NAND extends BaseOperator<
  iBoolean,
  Operator<iBoolean, iBoolean>
> {
  static override internalName = "integrateddynamics:logical_nand" as const;
  constructor() {
    super({
      nicknames: ["nand", "logicalNand"],
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
      symbol: "!&&",
      interactName: "booleanNand",
      function: (bool1: iBoolean): TypeLambda<iBoolean, iBoolean> => {
        return (bool2: iBoolean): iBoolean => {
          return new iBoolean(!(bool1.valueOf() && bool2.valueOf()));
        };
      },
    });
  }
}
