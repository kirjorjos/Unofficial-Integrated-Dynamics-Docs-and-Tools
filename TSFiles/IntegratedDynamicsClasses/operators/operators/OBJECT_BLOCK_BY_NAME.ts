import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_BLOCK_BY_NAME extends BaseOperator<
  iString,
  Block
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:block_blockbyname",
      nicknames: ["BlockByName", "block_by_name", "blockByName"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Block",
          },
        },
        globalMap
      ),
      symbol: "block_by_name",
      interactName: "stringBlockByName",
      function: (_name: iString): Block => {
        throw new Error(
          "Block by name is infeasible without a registry. This is a placeholder function."
        );
      },
    });
  }
}
