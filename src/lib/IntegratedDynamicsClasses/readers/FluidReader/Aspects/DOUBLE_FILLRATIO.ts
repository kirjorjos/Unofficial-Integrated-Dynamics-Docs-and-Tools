import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_DOUBLE_FILLRATIO extends FluidAspectBase {
  static displayName = "fluidFillRatio";
  static fullDisplayName = "Fluid Fill Ratio";
  static nicknames = [
    "fluidFillRatio",
    "fluid_fill_ratio",
    "fillRatio",
    "fill_ratio",
  ];
  static settings = { tankid: 0 };
  static icon = "double/fluid/fillratio";
  static outputType = "Double";
}
