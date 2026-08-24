import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_FLUIDSTACK extends FluidAspectBase {
  static displayName = "tankFluid";
  static fullDisplayName = "Tank Fluid";
  static nicknames = [
    "tankFluid",
    "tank_fluid",
    "fluidStack",
    "fluid_stack",
    "fluid",
  ];
  static settings = { tankid: 0 };
  static icon = "fluidstack/fluid";
  static outputType = "Fluid";
}
