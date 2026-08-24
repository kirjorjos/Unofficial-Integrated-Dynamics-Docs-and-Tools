import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_ISENERGY extends MachineAspectBase {
  static displayName = "isEnergyHandler";
  static fullDisplayName = "Is FE Handler";
  static nicknames = [
    "isEnergyHandler",
    "is_energy_handler",
    "isFEHandler",
    "is_fe_handler",
    "energyHandler",
    "energy_handler",
  ];
  static settings = {};
  static icon = "boolean/fe/applicable";
  static outputType = "Boolean";
  static tooltipInfo = "If the target in some way handles FE";
}
