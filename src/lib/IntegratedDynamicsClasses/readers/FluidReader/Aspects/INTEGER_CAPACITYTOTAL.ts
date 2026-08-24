import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_INTEGER_CAPACITYTOTAL extends FluidAspectBase {
  static displayName = "totalFluidCapacity";
  static fullDisplayName = "Total Fluid Capacity";
  static nicknames = [
    "totalFluidCapacity",
    "total_fluid_capacity",
    "totalCapacity",
    "total_capacity",
  ];
  static settings = {};
  static icon = "integer/fluid/totalcapacity";
  static outputType = "Integer";
  static tooltipInfo = "Total capacity of the tank";
}
