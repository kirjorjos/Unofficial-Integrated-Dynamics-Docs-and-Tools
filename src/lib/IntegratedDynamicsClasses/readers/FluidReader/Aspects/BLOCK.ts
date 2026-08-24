import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_BLOCK extends FluidAspectBase {
  static displayName = "blockFluid";
  static fullDisplayName = "Block Fluid";
  static nicknames = ["blockFluid", "block_fluid", "fluidBlock", "fluid_block"];
  static settings = {};
  static icon = "fluidstack/block";
  static outputType = "Fluid";
  static tooltipInfo = "The fluid in the target block";
}
