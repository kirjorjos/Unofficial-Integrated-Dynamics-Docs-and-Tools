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
    "stringFluidsByTag",
    "FluidstackTagStacks",
    "fluidStackTagStacks",
    "fluid_stack_tag_stacks",
    "fluidTagStacks",
    "fluidtag",
    "stringFluidtag",
  ];
  static override symbol = "fluid_tag_values";
  static override interactName = "stringFluidsByTag";
  static override operatorName = "fluidtag" as const;
  static override displayName = "Fluid Tag Values" as const;
  static override fullDisplayName = "String Fluid Tag Values" as const;
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
