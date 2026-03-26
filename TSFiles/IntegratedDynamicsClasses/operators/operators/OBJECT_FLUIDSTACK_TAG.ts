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
  static override internalName = "integrateddynamics:fluidstack_tag" as const;
  static override numericID = 297;
  static override nicknames = [
    "fluidstackTags",
    "FluidstackTag",
    "fluidstackTag",
    "fluidstackTagStacks",
    "fluidstackTagStack",
    "fluidTag",
  ];
  static override symbol = "fluid_tag_names";
  static override interactName = "fluidstackTags";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): iArray<iString> => {
        return new iArrayEager(
          fluid
            .getTagNames()
            .valueOf()
            .map((e: iString) => new iString(e.valueOf()))
        );
      },
    });
  }
}
