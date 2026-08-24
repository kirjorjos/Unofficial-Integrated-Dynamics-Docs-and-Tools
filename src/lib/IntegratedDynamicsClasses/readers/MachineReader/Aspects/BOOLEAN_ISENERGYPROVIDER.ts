import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_ISENERGYPROVIDER extends MachineAspectBase {
  static displayName = "isEnergyProvider";
  static fullDisplayName = "Is FE Provider";
  static nicknames = [
    "isEnergyProvider",
    "is_energy_provider",
    "isFEProvider",
    "is_fe_provider",
    "energyProvider",
    "energy_provider",
  ];
  static settings = {};
  static icon = "boolean/fe/isprovider";
  static outputType = "Boolean";
  static tooltipInfo = "If the target can provide FE";
}
