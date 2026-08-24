import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_LIST_TANKCAPACITIES extends FluidAspectBase {
  static displayName = "tankCapacities";
  static fullDisplayName = "Tank Capacities";
  static nicknames = ["tankCapacities", "tank_capacities", "capacities"];
  static settings = {};
  static icon = "list/fluid/capacities";
  static outputType = "List";
}
