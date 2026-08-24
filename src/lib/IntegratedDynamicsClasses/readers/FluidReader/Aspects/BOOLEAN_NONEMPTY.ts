import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_BOOLEAN_NONEMPTY extends FluidAspectBase {
  static displayName = "tankNotEmpty";
  static fullDisplayName = "Tank Not Empty";
  static nicknames = [
    "tankNotEmpty",
    "tank_not_empty",
    "hasFluid",
    "has_fluid",
    "fluidNotEmpty",
    "fluid_not_empty",
  ];
  static settings = {};
  static icon = "boolean/fluid/nonempty";
  static outputType = "Boolean";
  static tooltipInfo = "If the target fluid tank has something in it";
}
