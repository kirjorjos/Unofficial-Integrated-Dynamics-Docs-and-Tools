import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_FLUIDSTACK_TAG extends BaseOperator<
  Fluid,
  iArray<iString>
> {
  static override internalName = "integrateddynamics:fluidstack_tag" as const;
  static override numericID = 297;
  static override nicknames = [
    "fluidstackTag",
    "FluidstackTag",
    "fluidstackTags",
    "fluidstackTagStack",
    "fluidstackTagStacks",
    "fluidTag",
    "tag",
    "fluid_tag",
    "fluidstack_tag",
    "fluidstack_tag_stack",
    "fluidstack_tag_stacks",
    "fluidstack_tags",
  ];
  static override symbol = "fluid_tag_names";
  static override interactName = "fluidstackTags";
  static override operatorName = "tag" as const;
  static override displayName = "Fluid Tag Names" as const;
  static override fullDisplayName = "Fluid Fluid Tag Names" as const;
  static override kind = "fluidstack" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
