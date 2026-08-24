import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_BOOLEAN_EMPTY extends FluidAspectBase {
  static displayName = "tankEmpty";
  static fullDisplayName = "Tank Empty";
  static nicknames = [
    "tankEmpty",
    "tank_empty",
    "isEmpty",
    "fluidEmpty",
    "fluid_empty",
  ];
  static settings = {};
  static icon = "boolean/fluid/empty";
  static outputType = "Boolean";
  static tooltipInfo = "If the target fluid tank is empty";
}
