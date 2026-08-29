import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";
import { FluidConstructor } from "lib/IntegratedDynamicsClasses/registries/fluidRegistry";

export class OPERATOR_OBJECT_FLUIDSTACK_TAG_STACKS extends BaseOperator<
  iString,
  iArray<Fluid>
> {
  static override internalName = "integrateddynamics:string_fluidtag" as const;
  static override numericID = 299;
  static override nicknames = [
    "fluidStackTagStacks",
    "FluidstackTagStacks",
    "fluidTagStacks",
    "stringFluidsByTag",
    "fluid_stack_tag_stacks",
    "fluid_tag_stacks",
    "fluidstack_tag_stacks",
    "string_fluids_by_tag",
    "string_fluidtag",
  ];
  static override symbol = "fluid_tag_values";
  static override interactName = "stringFluidsByTag";
  static override operatorName = "fluidtag" as const;
  static override displayName = "Fluid Tag Values" as const;
  static override fullDisplayName = "String Fluid Tag Values" as const;
  static override stringDisplayNames = [
    "fluid tag values",
    "fluid tag Values",
    "fluid Tag values",
    "fluid Tag Values",
    "Fluid tag values",
    "Fluid tag Values",
    "Fluid Tag values",
    "Fluid Tag Values",
    "fluidstack tag values",
    "fluidstack tag Values",
    "fluidstack Tag values",
    "fluidstack Tag Values",
    "Fluidstack tag values",
    "Fluidstack tag Values",
    "Fluidstack Tag values",
    "Fluidstack Tag Values",
    "fluidStack tag values",
    "fluidStack tag Values",
    "fluidStack Tag values",
    "fluidStack Tag Values",
    "FluidStack tag values",
    "FluidStack tag Values",
    "FluidStack Tag values",
    "FluidStack Tag Values",
    "string fluid tag values",
    "string fluid tag Values",
    "string fluid Tag values",
    "string fluid Tag Values",
    "string Fluid tag values",
    "string Fluid tag Values",
    "string Fluid Tag values",
    "string Fluid Tag Values",
    "String fluid tag values",
    "String fluid tag Values",
    "String fluid Tag values",
    "String fluid Tag Values",
    "String Fluid tag values",
    "String Fluid tag Values",
    "String Fluid Tag values",
    "String Fluid Tag Values",
    "string fluidstack tag values",
    "string fluidstack tag Values",
    "string fluidstack Tag values",
    "string fluidstack Tag Values",
    "string Fluidstack tag values",
    "string Fluidstack tag Values",
    "string Fluidstack Tag values",
    "string Fluidstack Tag Values",
    "string fluidStack tag values",
    "string fluidStack tag Values",
    "string fluidStack Tag values",
    "string fluidStack Tag Values",
    "string FluidStack tag values",
    "string FluidStack tag Values",
    "string FluidStack Tag values",
    "string FluidStack Tag Values",
    "String fluidstack tag values",
    "String fluidstack tag Values",
    "String fluidstack Tag values",
    "String fluidstack Tag Values",
    "String Fluidstack tag values",
    "String Fluidstack tag Values",
    "String Fluidstack Tag values",
    "String Fluidstack Tag Values",
    "String fluidStack tag values",
    "String fluidStack tag Values",
    "String fluidStack Tag values",
    "String fluidStack Tag Values",
    "String FluidStack tag values",
    "String FluidStack tag Values",
    "String FluidStack Tag values",
    "String FluidStack Tag Values",
  ];
  static override kind = "string" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "List", listType: { type: "Fluid" } },
        },
        normalizeSignature
      ),
      function: (name: iString): iArray<Fluid> => {
        const fluidRegistry = RegistryHub.fluidRegistry;
        const fluids: Fluid[] = [];
        for (const FluidConstructor of Object.values(
          fluidRegistry.items
        ) as FluidConstructor[]) {
          const fluid = new FluidConstructor();
          if (fluid.getTagNames().includes(name).valueOf()) {
            fluids.push(fluid);
          }
        }
        return new iArrayEager(fluids);
      },
    });
  }
}
