import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_BOOLEAN_FULL extends FluidAspectBase {
  static displayName = "tankFull";
  static fullDisplayName = "Tank Full";
  static nicknames = [
    "tankFull",
    "tank_full",
    "isFull",
    "fluidFull",
    "fluid_full",
  ];
  static settings = {};
  static icon = "boolean/fluid/full";
  static outputType = "Boolean";
  static tooltipInfo = "If the target fluid tank is full";
}
