import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_ISENERGYEMPTY extends MachineAspectBase {
  static displayName = "isEnergyBufferEmpty";
  static fullDisplayName = "Is FE Buffer Empty";
  static nicknames = [
    "isEnergyBufferEmpty",
    "is_energy_buffer_empty",
    "isEnergyEmpty",
    "is_energy_empty",
    "energyEmpty",
    "energy_empty",
    "isFEEmpty",
    "is_fe_empty",
  ];
  static settings = {};
  static icon = "boolean/fe/isempty";
  static outputType = "Boolean";
  static tooltipInfo = "If the target's FE buffer is completely empty";
}
