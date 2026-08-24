import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_ISENERGYFULL extends MachineAspectBase {
  static displayName = "isEnergyBufferFull";
  static fullDisplayName = "Is FE Buffer Full";
  static nicknames = [
    "isEnergyBufferFull",
    "is_energy_buffer_full",
    "isEnergyFull",
    "is_energy_full",
    "energyFull",
    "energy_full",
    "isFEFull",
    "is_fe_full",
  ];
  static settings = {};
  static icon = "boolean/fe/isfull";
  static outputType = "Boolean";
}
