import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_INTEGER_TANKS extends FluidAspectBase {
  static displayName = "tanks";
  static fullDisplayName = "Tanks";
  static nicknames = ["tanks", "tankCount", "tank_count"];
  static settings = {};
  static icon = "integer/fluid/tanks";
  static outputType = "Integer";
}
