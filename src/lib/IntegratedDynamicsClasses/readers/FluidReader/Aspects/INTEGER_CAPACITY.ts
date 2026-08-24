import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_INTEGER_CAPACITY extends FluidAspectBase {
  static displayName = "fluidCapacity";
  static fullDisplayName = "Fluid Capacity";
  static nicknames = [
    "fluidCapacity",
    "fluid_capacity",
    "capacity",
    "tankCapacity",
    "tank_capacity",
  ];
  static settings = { tankid: 0 };
  static icon = "integer/fluid/capacity";
  static outputType = "Integer";
}
