import { NetworkAspectBase } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkAspectBase";

export class NETWORK_INTEGER_ENERGY_STORED extends NetworkAspectBase {
  static displayName = "energyStored";
  static fullDisplayName = "Energy Stored";
  static nicknames = [
    "energyStored",
    "energy_stored",
    "storedEnergy",
    "stored_energy",
    "stored",
  ];
  static settings = { channel: -1 };
  static settingsInfo = {
    channel: { displayName: "Channel" },
  };
  static icon = "integer/network/energy/stored";
  static outputType = "Integer";
  static tooltipInfo = "The amount of energy available in the target network";
}
