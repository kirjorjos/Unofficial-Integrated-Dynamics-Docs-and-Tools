import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_ISENERGYNONEMPTY extends MachineAspectBase {
  static displayName = "isEnergyBufferNotEmpty";
  static fullDisplayName = "Is FE Buffer Not Empty";
  static nicknames = [
    "isEnergyBufferNotEmpty",
    "is_energy_buffer_not_empty",
    "energyNotEmpty",
    "energy_not_empty",
    "hasEnergy",
    "has_energy",
    "isFENonEmpty",
    "is_fe_nonempty",
  ];
  static settings = {};
  static icon = "boolean/fe/isnonempty";
  static outputType = "Boolean";
}
