import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_NULLABLE_ISNOTNULL extends BaseOperator<
  IntegratedValue,
  iBoolean
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:general_isnotnull",
      nicknames: ["isNotNull", "nullableIsnotnull"],
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
      symbol: "∅",
      interactName: "anyIsNotNull",
      function: (value: IntegratedValue): iBoolean => {
        return new iBoolean(value !== null && value !== undefined);
      },
    });
  }
}
