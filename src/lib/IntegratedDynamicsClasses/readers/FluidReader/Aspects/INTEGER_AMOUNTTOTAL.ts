import { FluidAspectBase } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidAspectBase";

export class FLUID_INTEGER_AMOUNTTOTAL extends FluidAspectBase {
  static displayName = "totalFluidAmount";
  static fullDisplayName = "Total Fluid Amount";
  static nicknames = [
    "totalFluidAmount",
    "total_fluid_amount",
    "totalAmount",
    "total_amount",
  ];
  static settings = {};
  static icon = "integer/fluid/totalamount";
  static outputType = "Integer";
  static tooltipInfo = "The total amount of fluid in mB";
}
