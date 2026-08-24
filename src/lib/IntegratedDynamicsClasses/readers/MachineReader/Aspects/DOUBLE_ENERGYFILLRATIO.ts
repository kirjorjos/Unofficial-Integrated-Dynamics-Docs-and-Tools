import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_DOUBLE_ENERGYFILLRATIO extends MachineAspectBase {
  static displayName = "energyFillRatio";
  static fullDisplayName = "FE Fill Ratio";
  static nicknames = [
    "energyFillRatio",
    "energy_fill_ratio",
    "feFillRatio",
    "fe_fill_ratio",
    "fillRatio",
    "fill_ratio",
  ];
  static settings = {};
  static icon = "double/fe/fillratio";
  static outputType = "Double";
}
