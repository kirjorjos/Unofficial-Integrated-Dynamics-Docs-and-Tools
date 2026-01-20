import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_FLUIDSTACK_TAG extends BaseOperator<
  Fluid,
  iArray<iString>
> {
    static override internalName = "integrateddynamics:fluidstack_tag"
  constructor() {
    super({
      nicknames: [
        "FluidstackTag",
        "fluidstackTag",
        "fluidstackTagStacks",
        "fluidstackTagStack",
        "fluidTag",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "fluid_tag_names",
      interactName: "fluidstackTags",
      function: (fluid: Fluid): iArray<iString> => {
        return new iArrayEager(fluid.getTagNames().map((e) => new iString(e)));
      },
    });
  }
}
