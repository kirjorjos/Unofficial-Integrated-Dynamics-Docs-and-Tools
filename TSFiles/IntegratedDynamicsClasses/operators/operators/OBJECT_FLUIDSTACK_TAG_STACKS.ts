import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_TAG_STACKS extends BaseOperator<
  iString,
  iArray<Fluid>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_fluidtag",
      nicknames: [
        "FluidstackTagStacks",
        "fluidStackTagStacks",
        "fluid_stack_tag_stacks",
        "fluidTagStacks",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "List", listType: { type: "Fluid" } },
        },
        globalMap
      ),
      symbol: "fluid_tag_values",
      interactName: "stringFluidsByTag",
      function: (_name: iString): never => {
        throw new Error(
          "Fluid tag values is infeasible without a registry. This is a placeholder function."
        );
      },
    });
  }
}
