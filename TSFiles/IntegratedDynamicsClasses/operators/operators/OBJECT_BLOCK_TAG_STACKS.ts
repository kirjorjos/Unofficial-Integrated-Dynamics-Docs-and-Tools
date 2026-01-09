import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_TAG_STACKS extends BaseOperator<
  iString,
  iArray<Block>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_blocktag",
      nicknames: ["BlockTagStacks", "block_tag_stacks", "blockTagStacks"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "List", listType: { type: "Block" } },
        },
        globalMap
      ),
      symbol: "block_tag_values",
      interactName: "stringBlocksByTag",
      function: (_name: iString): never => {
        throw new Error(
          "Block tag values is infeasible without a registry. This is a placeholder function."
        );
      },
    });
  }
}
