import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";

export class OPERATOR_OBJECT_FLUIDSTACK_BY_NAME extends BaseOperator<
  iString,
  Fluid
> {
  static override internalName =
    "integrateddynamics:fluidstack_by_name" as const;
  static override numericID = 303;
  static override nicknames = [
    "stringFluidByName",
    "FluidstackByName",
    "fluidstack_by_name",
    "fluidstackByName",
    "fluid_by_name",
    "fluidByName",
  ];
  static override symbol = "fluid_by_name";
  static override interactName = "stringFluidByName";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Fluid",
          },
        },
        normalizeSignature
      ),
      function: (name: iString): Fluid => {
        const fluidRegistry = RegistryHub.fluidRegistry;
        const key = name.valueOf().toLowerCase();
        const FluidConstructor =
          fluidRegistry.items[key as keyof typeof fluidRegistry.items];
        if (!FluidConstructor) return new Fluid(new Properties({}));
        return new FluidConstructor();
      },
    });
  }
}
