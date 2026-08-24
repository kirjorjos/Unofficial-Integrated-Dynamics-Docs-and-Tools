import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_INTEGER_ENERGYCAPACITY extends MachineAspectBase {
  static displayName = "energyCapacity";
  static fullDisplayName = "FE Capacity";
  static nicknames = [
    "energyCapacity",
    "energy_capacity",
    "feCapacity",
    "fe_capacity",
    "capacity",
  ];
  static settings = {};
  static icon = "integer/fe/capacity";
  static outputType = "Integer";
}
