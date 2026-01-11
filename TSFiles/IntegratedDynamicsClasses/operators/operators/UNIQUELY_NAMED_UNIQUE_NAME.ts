import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { UniquelyNamed } from "IntegratedDynamicsClasses/UniquelyNamed";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_UNIQUELY_NAMED_UNIQUE_NAME extends BaseOperator<
  IntegratedValue,
  iString
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_unique_name",
      nicknames: ["uname", "uniquelynamedUniquename"],
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
        globalMap
      ),
      symbol: "uname",
      interactName: "uniquely_namedUniqueName",
      function: (uniquelyNamed: UniquelyNamed): iString => {
        return uniquelyNamed.getUniqueName();
      },
    });
  }
}
