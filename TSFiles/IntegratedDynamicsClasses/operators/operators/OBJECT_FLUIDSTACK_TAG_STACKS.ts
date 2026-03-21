import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { RegistryHub } from "IntegratedDynamicsClasses/registries/registryHub";
import { FluidConstructor } from "IntegratedDynamicsClasses/registries/fluidRegistry";

export class OPERATOR_OBJECT_FLUIDSTACK_TAG_STACKS extends BaseOperator<
  iString,
  iArray<Fluid>
> {
  static override internalName = "integrateddynamics:string_fluidtag" as const;
  static override nicknames = [
    "stringFluidsByTag",
    "FluidstackTagStacks",
    "fluidStackTagStacks",
    "fluid_stack_tag_stacks",
    "fluidTagStacks",
  ];
  static override symbol = "fluid_tag_values";
  static override interactName = "stringFluidsByTag";
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
