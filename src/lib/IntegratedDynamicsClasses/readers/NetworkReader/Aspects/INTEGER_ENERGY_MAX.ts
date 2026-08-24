import { NetworkAspectBase } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkAspectBase";

export class NETWORK_INTEGER_ENERGY_MAX extends NetworkAspectBase {
  static displayName = "energyCapacity";
  static fullDisplayName = "Energy Capacity";
  static nicknames = [
    "energyCapacity",
    "energy_capacity",
    "maxEnergy",
    "max_energy",
    "capacity",
  ];
  static settings = { channel: -1 };
  static icon = "integer/network/energy/max";
  static outputType = "Integer";
}
