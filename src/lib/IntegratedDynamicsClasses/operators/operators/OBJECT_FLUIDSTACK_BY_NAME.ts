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
    "fluidbyname",
    "fluidByName",
    "fluidstackByName",
    "FluidstackByName",
    "fluidstackFluidbyname",
    "stringFluidByName",
    "fluid_by_name",
    "fluidstack_by_name",
    "fluidstack_fluidbyname",
    "string_fluid_by_name",
  ];
  static override symbol = "fluid_by_name";
  static override interactName = "stringFluidByName";
  static override operatorName = "fluidbyname" as const;
  static override displayName = "Fluid By Name" as const;
  static override fullDisplayName = "Fluid Fluid By Name" as const;
  static override kind = "fluidstack" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
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
