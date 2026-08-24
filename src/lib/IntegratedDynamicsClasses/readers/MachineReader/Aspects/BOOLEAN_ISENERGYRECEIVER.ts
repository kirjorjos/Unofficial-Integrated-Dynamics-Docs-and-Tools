import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_ISENERGYRECEIVER extends MachineAspectBase {
  static displayName = "isEnergyReceiver";
  static fullDisplayName = "Is FE Receiver";
  static nicknames = [
    "isEnergyReceiver",
    "is_energy_receiver",
    "isFEReceiver",
    "is_fe_receiver",
    "energyReceiver",
    "energy_receiver",
  ];
  static settings = {};
  static icon = "boolean/fe/isreceiver";
  static outputType = "Boolean";
}
