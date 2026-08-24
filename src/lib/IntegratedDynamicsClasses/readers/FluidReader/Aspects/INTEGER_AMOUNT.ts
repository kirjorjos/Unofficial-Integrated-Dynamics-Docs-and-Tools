import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_INTEGER_AMOUNT extends FluidAspectBase {
  static displayName = "fluidAmount";
  static fullDisplayName = "Fluid Amount";
  static nicknames = [
    "fluidAmount",
    "fluid_amount",
    "amount",
    "fluidLevel",
    "fluid_level",
  ];
  static settings = { tankid: 0 };
  static settingsInfo = {
    tankid: { displayName: "Tank ID" },
  };
  static icon = "integer/fluid/amount";
  static outputType = "Integer";
  static tooltipInfo = "The amount of fluid in mB in the active tank";
}
