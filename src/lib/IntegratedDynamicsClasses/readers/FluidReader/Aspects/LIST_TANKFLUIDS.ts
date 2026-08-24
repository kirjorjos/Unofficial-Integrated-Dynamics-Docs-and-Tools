import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_LIST_TANKFLUIDS extends FluidAspectBase {
  static displayName = "tankFluids";
  static fullDisplayName = "Tank Fluids";
  static nicknames = [
    "tankFluids",
    "tank_fluids",
    "fluids",
    "fluidList",
    "fluid_list",
  ];
  static settings = {};
  static icon = "list/fluid/fluidstacks";
  static outputType = "List";
  static tooltipInfo = "The list of fluids in all tanks";
}
