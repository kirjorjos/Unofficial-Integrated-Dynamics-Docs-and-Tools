import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_NULLABLE_ISNULL extends BaseOperator<
  IntegratedValue,
  iBoolean
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:general_isnull",
      nicknames: ["isNull", "nullableIsnull", "GENERAL_IS_NULL"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "o",
      interactName: "anyIsNull",
      function: (value: IntegratedValue): iBoolean => {
        return new iBoolean(value === null || value === undefined);
      },
    });
  }
}
