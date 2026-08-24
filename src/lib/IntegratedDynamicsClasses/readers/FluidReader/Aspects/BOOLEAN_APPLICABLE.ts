import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_BOOLEAN_APPLICABLE extends FluidAspectBase {
  static displayName = "isTank";
  static fullDisplayName = "Is Tank";
  static nicknames = ["isTank", "is_tank", "tankApplicable", "tank_applicable"];
  static settings = {};
  static icon = "boolean/fluid/applicable";
  static outputType = "Boolean";
}
